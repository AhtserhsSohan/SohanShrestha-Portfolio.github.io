# Lab 0X: [Lab name, e.g. VLANs & Trunking]

**Date:** DD Mon 2026 · **Tool:** Packet Tracer / GNS3 · **Time spent:** ~X hrs
**CCNA topic:** [e.g. 2.1 Configure and verify VLANs]

## 1. Goal
One or two sentences on the scenario. Example: *A small office has Admin, Staff and Guest users on one switch. Separate them so guests can't reach internal devices.*

## 2. Topology
![Topology](topology.png)

| Device | Interface | VLAN / IP | Notes |
|---|---|---|---|
| SW1 | Fa0/1–5 | VLAN 10 (Admin) | access |
| SW1 | Gi0/1 | Trunk | native VLAN 99 |

## 3. Configuration
Only the commands that matter. Full configs are in `/configs`.

```
SW1(config)# vlan 10
SW1(config-vlan)# name ADMIN
SW1(config)# interface range fa0/1-5
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 10
```

## 4. Verification
Show the proof: command output or screenshots.

```
SW1# show vlan brief
SW1# show interfaces trunk
```

- [ ] PC in VLAN 10 can ping another PC in VLAN 10
- [ ] PC in VLAN 30 (Guest) **cannot** reach VLAN 10

## 5. What went wrong and how I fixed it
This is the section employers read most closely. Be honest.
- *Problem:* Trunk wasn't passing VLAN 20.
- *Cause:* `switchport trunk allowed vlan` was missing VLAN 20.
- *Fix / lesson:* Always check `show interfaces trunk` before testing pings.

## 6. Security notes
What would make this safer in a real network (unused ports shut down, native VLAN changed, BPDU guard, etc.).

## 7. Real-world link
One line connecting the lab to a real setting. Example: *In an aged care home, this keeps residents' guest Wi-Fi away from the clinical records system.*
