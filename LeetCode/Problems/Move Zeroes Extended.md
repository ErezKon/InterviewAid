# 283. Move Zeroes — Extended Patterns

**Difficulty:** 🟡 Medium
**LeetCode:** 
**Companies:** Accenture, Accolite, Adobe, Adp, Amazon, Amd, Anduril, Apple, Bloomberg, Capgemini, Chewy, Cisco, Cognizant, Coinswitch Kuber, Crowdstrike, Epam Systems, Goldman Sachs, Google, Ibm, Infosys, Intuit, Josh Technology, Jtg, Kpmg, Lti, Meta, Microsoft, Netapp, Nvidia, Oracle, Paypal, Qualcomm, Salesforce, Samsung, Sap, Servicenow, Sigmoid, Tcs, Tiktok, Uber, Verizon, Vk, Walmart Labs, Wix, Yandex, Zoho, Zomato

---

## Problem Description
Given an integer array `nums`, move all `0`s to the end of the array while maintaining the relative order of the non‑zero elements. The operation must be performed **in‑place** with O(1) extra space.

## Examples
| nums | after move |
|------|------------|
| [0,1,0,3,12] | [1,3,12,0,0] |
| [1,2,3] | [1,2,3] |
| [0,0,0] | [0,0,0] |

## Approach
**Algorithm:** Reader‑Writer (slow‑fast) pointer.
1. Initialise `write = 0`.
2. Iterate `read` from `0` to `n‑1`.
3. When `nums[read] != 0`, copy it to `nums[write]` and increment `write`.
4. After the loop, fill the remaining positions from `write` to `n‑1` with `0`.

### Pseudocode
```text
FUNCTION moveZeroes(nums):
    SET n ← LENGTH(nums)
    SET write ← 0
    FOR read ← 0 TO n-1:
        IF nums[read] != 0:
            SET nums[write] ← nums[read]
            SET write ← write + 1
    // Fill the tail with zeros
    WHILE write < n:
        SET nums[write] ← 0
        SET write ← write + 1
```

## Walkthrough
For `nums = [0,1,0,3,12]`:
| step | read | nums[read] | write | array state |
|------|------|------------|-------|------------|
| init | – | – | 0 | [0,1,0,3,12] |
| 0 | 0 | 0 | 0 | unchanged |
| 1 | 1 | 1 | 0 → set nums[0]=1, write=1 | [1,1,0,3,12] |
| 2 | 2 | 0 | 1 | unchanged |
| 3 | 3 | 3 | 1 → set nums[1]=3, write=2 | [1,3,0,3,12] |
| 4 | 4 | 12 | 2 → set nums[2]=12, write=3 | [1,3,12,3,12] |
| fill zeros | write=3..4 | – | – | [1,3,12,0,0] |

## Complexity Analysis
- Time: O(n) – single pass.
- Space: O(1) – only two index variables.

## Follow‑Up Questions
1. How would you modify the algorithm to move all occurrences of a given value `val` to the end?
2. Can you solve the problem using a two‑pointer swapping approach instead of copy?
3. What is the runtime if the array is immutable and you must return a new array?

## Key Takeaway
The reader‑writer pointer lets you compact all desired elements at the front in a single linear scan, then pad the remainder with zeros using constant extra space.