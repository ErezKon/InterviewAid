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

```
FUNCTION permute(nums):
    result = []
    backtrack(nums, [], result, set())
    RETURN result

FUNCTION backtrack(nums, path, result, used):
    IF len(path) == len(nums):
        result.ADD(copy of path)
        RETURN

    FOR num IN nums:
        IF num IN used: CONTINUE
        used.ADD(num)
        path.ADD(num)
        backtrack(nums, path, result, used)
        path.REMOVE_LAST()
        used.REMOVE(num)
```

### Alternative: Swap-based

```
FUNCTION permute(nums):
    result = []
    backtrack(nums, 0, result)
    RETURN result

FUNCTION backtrack(nums, start, result):
    IF start == len(nums):
        result.ADD(copy of nums)
        RETURN
    FOR i ← start TO len(nums) - 1:
        SWAP(nums[start], nums[i])
        backtrack(nums, start + 1, result)
        SWAP(nums[start], nums[i])
```

---

## 3. Follow-Up: Permutations II (LeetCode #47) — with duplicates?

Sort first. Skip `nums[i]` if `nums[i] == nums[i-1]` and `nums[i-1]` was not used at this level.

---

## Key Takeaway

> Permutations = backtracking where each element is used exactly once. The swap-based approach is elegant and avoids the `used` set. n! permutations × O(n) to copy each = O(n·n!).
