# 2997. Minimum Number of Operations to Make Array XOR Equal to K

**Difficulty:** 🟡 Medium
**Companies:** Amazon, American Express, Auriga

---

## Problem Description

Given an integer array `nums` and an integer `k`, you may perform the following operation any number of times: choose an element `nums[i]` and replace it with any non‑negative integer. The goal is to make the XOR of all elements in the array equal to `k`. Return the minimum number of operations required.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3], k = 2
Output: 1
Explanation: Current XOR = 1⊕2⊕3 = 0. Changing any element to 2 makes the total XOR 2. Only one operation is needed.
```

**Example 2:**
```
Input: nums = [5,1,2,3], k = 4
Output: 2
Explanation: XOR of array = 5⊕1⊕2⊕3 = 5. To reach 4 we need to flip bits where 5 and 4 differ, which requires 2 operations.
```

---

## Approach

**Greedy – Bit Count (O(n))**

1. Compute `xorAll` as the XOR of all elements.
2. The XOR we need to achieve is `xorAll ⊕ k`. Each bit set to `1` in this value indicates a mismatch that must be fixed by changing one element.
3. The minimum number of operations equals the number of `1` bits in `xorAll ⊕ k`.

```text
FUNCTION minOperations(nums, k):
    xorAll ← 0
    FOR x IN nums DO
        xorAll ← xorAll XOR x
    diff ← xorAll XOR k
    RETURN COUNT_BITS(diff) // number of 1s in binary representation
```

---

## Walkthrough

For `nums = [1,2,3]`, `k = 2`:
| Step | xorAll | diff = xorAll⊕k | Bits set | Operations |
|------|--------|----------------|----------|------------|
| Compute | 1⊕2⊕3 = 0 | 0⊕2 = 2 | 1 (binary 10) | 1 |
Thus only one change is needed.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bit‑count scan | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. How would the solution change if you could only increment elements (no arbitrary replacement)?
2. Can you return the specific indices and new values to achieve the minimum operations?
3. What if the array is extremely large and must be processed in a streaming fashion?

---

## Key Takeaway

The XOR mismatch `xorAll ⊕ k` directly tells how many bits differ; each differing bit requires one element change, so the answer is simply the count of set bits.
