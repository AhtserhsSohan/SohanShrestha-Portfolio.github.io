# Network labs

Three networks from three kinds of workplace I know well. I ran networks like the first one at a managed service provider. The other two are designed around the kind of aged care home and hospitality venue I've worked in, and I'm building all three from scratch in Cisco Packet Tracer as CCNA practice.

| Lab | Setting | What it practises | Status |
|---|---|---|---|
| [01 – MSP client office](01-msp-client-office/) | Small business with a branch office, supported by an MSP | VLANs, inter-VLAN routing, DHCP, NAT, ACLs, site-to-site IPsec VPN | To build |
| [02 – Aged care home](02-aged-care-home/) | 60-bed residential aged care home | Segmentation for clinical, IoT/nurse call and resident Wi-Fi, layer 3 switching, WLC, RADIUS, backup WAN | To build |
| [03 – Hospitality venue](03-hospitality-venue/) | Suburban club with bars, bistro, gaming room and function room | POS isolation, edge firewall (ASA), port security, DHCP snooping, guest Wi-Fi | To build |

Each lab folder has a full guide: the scenario, topology, VLAN and IP plan, the security rules, step-by-step build tasks, how to prove it works, and stretch goals.

## How each lab gets published

1. Build it in Packet Tracer from the guide, from a blank file.
2. Commit the `.pkt` file and the running configs (`show running-config` from each device) to the lab's `configs/` folder.
3. Add screenshots of the topology and the verification output.
4. Fill in **What went wrong and how I fixed it** at the end of the guide.
5. Change the status in this table to **Done** and post about it on LinkedIn.

These are lab designs for learning. They are not copies of any employer's real network.
