# 2401. Longest Nice Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-nice-subarray](https://leetcode.com/problems/longest-nice-subarray)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Paytm

---

## 1. Problem Description

Find the longest subarray where every pair of elements bitwise AND to 0 ("nice" subarray).

---

## 2. Approach: Sliding Window + Bitmask — O(n) ✅

```
FUNCTION longestNiceSubarray(nums):
    used = 0; left = 0; maxLen = 0

    FOR right ← 0 TO n - 1:
        WHILE used & nums[right] != 0:
            used ^= nums[left]
            left += 1
        used |= nums[right]
        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

---

## 3. Examples

**Example 1:**
```
Input: nums = [1,3,8,48,10]
Output: 3
Explanation: The longest nice subarray is [3,8,48] (1 & 3 = 1, 3 & 8 = 0, 8 & 48 = 0).
```

**Example 2:**
```
Input: nums = [5,1,2,3,4]
Output: 4
Explanation: Subarray [1,2,3,4] is nice; each pair has AND 0.
```

---

## 4. Walkthrough

Consider the first example. `used` tracks the OR of bits in the current window.
- Start with `right=0`, `nums[0]=1`, `used=1`, window `[0,0]`.
- `right=1`, `nums[1]=3` (binary 011). `used & 3 = 1` (conflict), so shrink left: remove `nums[0]` (`used ^= 1 → 0`), `left=1`. Now `used=0`, add `3` → `used=3`.
- Continue expanding; whenever a conflict occurs, move `left` until the window is conflict‑free. The maximum window size observed is 3.

---

## 5. Complexity Analysis

- **Time:** O(n) – each element enters and leaves the window at most once.
- **Space:** O(1) – only a few integer variables are used.

---

## 6. Follow‑Up Questions

- How would the solution change if the condition were that the bitwise OR of any two elements must be less than a given threshold?
- Can you adapt the algorithm to return the actual subarray indices?
- What is the impact on complexity if the numbers can be up to 64‑bit instead of 32‑bit?

---

## 7. Key Takeaway

> Track OR of all window bits in `used`. Conflict = `used & nums[right] != 0` (overlapping bits). Shrink from left using XOR to remove bits. Max window ≤ 30 elements (one per bit).
