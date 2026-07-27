# 217. Contains Duplicate

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/contains-duplicate](https://leetcode.com/problems/contains-duplicate)
**Companies:** Accenture, Adobe, Airbnb, Amazon, Apple, Bloomberg, Capgemini, Google, Ibm, Infosys, Meta, Microsoft, Netflix, Nvidia, Oracle, Palantir, Paycom, Tcs, Visa, Yahoo, Zoho

---

## 1. Problem Description

Given an integer array `nums`, return `true` if any value appears at least twice.

---

## 2. Approach: Hash Set — O(n) ✅

```
FUNCTION containsDuplicate(nums):
    seen = set()
    FOR num IN nums:
        IF num IN seen: RETURN true
        seen.ADD(num)
    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Alternatives

| Approach | Time | Space |
|----------|------|-------|
| **Hash Set** | **O(n)** | **O(n)** |
| Sort first | O(n log n) | O(1) |

---

## Key Takeaway

> The simplest hash set application. Also solvable by sorting and checking adjacent elements.
