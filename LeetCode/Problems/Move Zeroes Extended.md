# 283. Move Zeroes — Extended Patterns

See also: [Move Zeroes.md](Move%20Zeroes.md) for the basic solution.

**Companies:** Accenture, Accolite, Adobe, Adp, Amazon, Amd, Anduril, Apple, Bloomberg, Capgemini, Chewy, Cisco, Cognizant, Coinswitch Kuber, Crowdstrike, Epam Systems, Goldman Sachs, Google, Ibm, Infosys, Intuit, Josh Technology, Jtg, Kpmg, Lti, Meta, Microsoft, Netapp, Nvidia, Oracle, Paypal, Qualcomm, Salesforce, Samsung, Sap, Servicenow, Sigmoid, Tcs, Tiktok, Uber, Verizon, Vk, Walmart Labs, Wix, Yandex, Zoho, Zomato
---

## The Reader-Writer Pointer Pattern

Move Zeroes is the canonical example of the **reader-writer** (or **slow-fast**) pointer pattern for in-place array partitioning:

| Problem | Reader Condition | Writer Action |
|---------|-----------------|---------------|
| Move Zeroes (#283) | `nums[r] != 0` | swap with writer |
| Remove Element (#27) | `nums[r] != val` | copy to writer |
| Remove Duplicates (#26) | `nums[r] != nums[w]` | copy to writer |
| Sort Colors (#75) | three-way partition | Dutch flag |

### General Template

```
write = 0
FOR read ← 0 TO n - 1:
    IF condition(nums[read]):
        swap or copy nums[read] to nums[write]
        write += 1
// Everything from write to n-1 is the "rejected" partition
```

This pattern appears in dozens of array problems. Recognizing it saves time in interviews.
