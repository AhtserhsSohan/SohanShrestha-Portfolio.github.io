# Lab 02 – Aged care home

**Status:** To build · **Tool:** Cisco Packet Tracer 8.x · **CCNA topics:** layer 3 switching (SVIs), VLANs, EtherChannel (LACP), DHCP relay, extended ACLs, wireless LAN controller, WPA2-Enterprise with RADIUS, floating static routes

## Scenario

A 60-bed residential aged care home runs 24/7. Carers use laptops and PCs to update care records and medication rounds. Residents' rooms have nurse call buttons and sensors. Residents and families want Wi-Fi. There's CCTV in the corridors and a small office.

I work as a specialised dementia carer, so I've seen how these buildings are used: if nurse call or care records go down at 2am, it affects residents straight away. The design priorities are:

1. **Keep clinical systems and nurse call up**, even if the internet fails.
2. **Keep health information private.** Resident Wi-Fi and smart devices must never reach care records.
3. **Make it easy to support.** Night staff aren't IT people.

## Topology

```mermaid
flowchart TB
  ISP1((Primary ISP)) --- R1[EDGE-R1<br/>ISR 4331]
  ISP2((Backup 4G ISP)) -. backup .- R1
  R1 --- CORE[CORE-SW<br/>3650-24PS<br/>layer 3]
  CORE == EtherChannel ==- SWA[WING-A<br/>2960]
  CORE == EtherChannel ==- SWB[WING-B<br/>2960]
  CORE --- WLC[WLC-2504]
  CORE --- SRV[Servers<br/>VLAN 60]
  SWA --- LAPA[Lightweight APs]
  SWB --- LAPB[Lightweight APs]
  SWA --- NC[Nurse call + sensors<br/>VLAN 30]
  SWB --- CL[Clinical PCs<br/>VLAN 10]
  SWB --- CAM[CCTV<br/>VLAN 50]
```

## Devices

| Device | Packet Tracer model | Role |
|---|---|---|
| EDGE-R1 | ISR 4331 | Internet edge, NAT, primary and backup WAN |
| ISP1, ISP2 | 2911 routers | Primary internet and backup (stands in for a 4G service) |
| CORE-SW | 3650-24PS | Inter-VLAN routing with SVIs, ACLs between VLANs |
| WING-A, WING-B | 2960-24TT | Access switches for each wing |
| WLC | WLC-2504 | Manages the access points and SSIDs |
| APs | 3702i / LAP-PT | Wi-Fi in each wing |
| SRV-CARE | Server-PT | "Care records" web app (HTTP) and DNS |
| SRV-NURSECALL | Server-PT | Nurse call server |
| SRV-RADIUS | Server-PT | AAA/RADIUS for staff Wi-Fi, plus DHCP for all VLANs |
| NVR | Server-PT | CCTV recorder |
| Nurse call, sensors | IoT devices / PC-PT | Room buttons, door and motion sensors |

## VLAN and IP plan

| VLAN | Name | Subnet | Gateway (CORE-SW SVI) |
|---|---|---|---|
| 10 | CLINICAL | 10.30.10.0/24 | 10.30.10.1 |
| 20 | ADMIN | 10.30.20.0/24 | 10.30.20.1 |
| 30 | NURSECALL-IOT | 10.30.30.0/24 | 10.30.30.1 |
| 40 | RESIDENTS | 10.30.40.0/24 | 10.30.40.1 |
| 50 | CCTV | 10.30.50.0/24 | 10.30.50.1 |
| 60 | SERVERS | 10.30.60.0/24 | 10.30.60.1 |
| 99 | MGMT | 10.30.99.0/24 | 10.30.99.1 |

Servers: SRV-CARE .10, SRV-NURSECALL .20, NVR .30, SRV-RADIUS .40 (all in 10.30.60.0/24). Core to edge link: 10.30.255.0/30.

## Security rules

| From | Can reach | Cannot reach |
|---|---|---|
| CLINICAL | Care records, nurse call server, internet | CCTV, IoT devices |
| ADMIN | Care records, internet | IoT devices, CCTV |
| NURSECALL-IOT | **Only** the nurse call server (10.30.60.20) | Everything else, including the internet |
| RESIDENTS | Internet only | **Any** 10.30.x network |
| CCTV | **Only** the NVR (10.30.60.30) | Everything else |
| MGMT | All network devices (SSH) | – |

## Build steps

**Part A – Switching**
- [ ] VLANs on all three switches. Use VTP transparent mode or create them manually.
- [ ] LACP EtherChannel (two links) from CORE-SW to each wing switch, as trunks.
- [ ] Access ports per VLAN, unused ports shut down, PortFast and BPDU guard on edge ports.

**Part B – Layer 3 core**
- [ ] `ip routing` on CORE-SW and one SVI per VLAN.
- [ ] Routed port to EDGE-R1, with a default route on CORE-SW and static routes back on EDGE-R1.
- [ ] DHCP pools on SRV-RADIUS, with `ip helper-address 10.30.60.40` on each SVI.

**Part C – Segmentation**
- [ ] Extended ACLs on the SVIs to enforce the security rules table. Apply each one inbound on the source VLAN.
- [ ] Test every row of the table, including the "cannot reach" column.

**Part D – Wireless**
- [ ] WLC on VLAN 99, with APs joining it.
- [ ] SSID `AC-Staff`: WPA2-Enterprise, authenticated by SRV-RADIUS, mapped to VLAN 10.
- [ ] SSID `AC-Residents`: WPA2-Personal, mapped to VLAN 40.
- [ ] SSID `AC-IoT`: WPA2-Personal, hidden, mapped to VLAN 30.

**Part E – Staying up**
- [ ] NAT on EDGE-R1 for the inside VLANs.
- [ ] Floating static default route to ISP2 (administrative distance 250), so the backup takes over when ISP1 fails.
- [ ] Show that nurse call keeps working when **both** ISPs are down. It's all internal.

## Prove it works

```
show etherchannel summary     ! Po1, Po2 = SU, ports = P
show ip interface brief
show ip route                 ! default via ISP1; via ISP2 after ISP1 fails
show access-lists             ! deny counters increase on test traffic
show wlan summary             ! on the WLC
```

- [ ] A resident laptop browses the internet but can't open `http://care.home.local`.
- [ ] A nurse call device reaches 10.30.60.20 and nothing else.
- [ ] A staff laptop joins `AC-Staff` with RADIUS credentials and opens care records.
- [ ] Shut down the link to ISP1 and confirm the default route moves to ISP2.

## Stretch goals
- Add a second core switch with HSRP for gateway redundancy.
- Use IP SLA tracking so the backup route also triggers if ISP1 is up but the internet isn't reachable.
- Add syslog and SNMP so faults are noticed before staff report them.

## Real-world notes
- Health information is sensitive, so segmentation limits who and what can reach it.
- Nurse call availability matters more than internet availability. Design so local systems work on their own.
- In a real building, UPS power for the core switch and APs keeps Wi-Fi and nurse call running during an outage.

## What went wrong and how I fixed it
_Fill this in while building._
