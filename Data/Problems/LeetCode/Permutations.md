# 46. Permutations

**Difficulty:** 🟡 Medium
**Acceptance:** 79.0%
**LeetCode:** [https://leetcode.com/problems/permutations](https://leetcode.com/problems/permutations)
**Companies:** Agoda, Amazon, American Express, Apple, Arista Networks, Bloomberg, Bookingcom, Cisco, Citadel, Epic Systems, Goldman Sachs, Google, Infosys, Linkedin, Meta, Microsoft, Microstrategy, Oracle, Qualcomm, Samsung, Tcs, Tiktok, Uber, Workday, Zomato

---

## 1. Problem Description

Given an array `nums` of **distinct** integers, return all possible permutations in any order.

---

## 2. Approach: Backtracking — O(n·n!) ✅

```text
FUNCTION permute(nums):
    result ← []
    backtrack(nums, [], result, set())
    RETURN result

FUNCTION backtrack(nums, path, result, used):
    IF len(path) == len(nums):
        APPEND copy of path TO result
        RETURN
    FOR num IN nums:
        IF num IN used: CONTINUE
        ADD num TO used
        APPEND num TO path
        backtrack(nums, path, result, used)
        REMOVE last FROM path
        REMOVE num FROM used
```

---

## 3. Examples

| nums | Output |
|------|--------|
| [1,2,3] | [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] |
| [0,1] | [[0,1],[1,0]] |

---

## 4. Walkthrough

Take `nums = [1,2,3]`.

1. Start with empty `path`. Choose `1` → `path=[1]`.
2. Recurse, choose `2` → `path=[1,2]`.
3. Recurse, choose `3` → `path=[1,2,3]` → add to result.
4. Backtrack: remove `3`, choose next (none). Backtrack to `path=[1]`.
5. Choose `3` → `path=[1,3]` → then `2` → add `[1,3,2]`.
6. Continue similarly to generate all 6 permutations.

---

## 5. Complexity Analysis

- **Time:** O(n·n!) – each of the n! permutations takes O(n) to copy.
- **Space:** O(n) recursion stack + O(n) for current `path`.

---

## 6. Follow-Up: Permutations II (LeetCode #47) — with duplicates?

Sort first. Skip `nums[i]` if `nums[i] == nums[i-1]` and `nums[i-1]` was not used at this level.

---

## Key Takeaway

> Permutations = backtracking where each element is used exactly once. The swap-based approach is elegant and avoids the `used` set. n! permutations × O(n) to copy each = O(n·n!).
