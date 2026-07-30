# 3878. Count Good Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-good-subarrays](https://leetcode.com/problems/count-good-subarrays)
**Companies:** Harness, Microsoft

---

## 1. Problem Description

Given an array `nums`, count subarrays that satisfy a "good" condition based on specific criteria (e.g., having at least `k` pairs of equal elements, or some aggregate property).

---

## 2. Key Insight

> Use a **sliding window** approach. As the window expands, track the count of qualifying pairs. When the condition is met, all extensions to the right also satisfy it, so add `n - right` to the count.

---

## 3. Approach: Sliding Window — O(n) ✅

```text
FUNCTION countGoodSubarrays(nums, k):
    n ← LENGTH(nums)
    freq ← MAP()
    pairs ← 0
    left ← 0
    count ← 0
    
    FOR right FROM 0 TO n-1:
        pairs ← pairs + freq[nums[right]]  // new pairs formed with current element
        freq[nums[right]] ← freq[nums[right]] + 1
        
        WHILE pairs ≥ k:
            count ← count + (n - right)  // all subarrays starting at left and ending anywhere ≥ right are good
            freq[nums[left]] ← freq[nums[left]] - 1
            pairs ← pairs - freq[nums[left]]
            left ← left + 1
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Examples

**Example 1:**
```
Input: nums = [1,2,1,2,1], k = 2
Output: 7
Explanation: Good subarrays are:
[1,2,1] (pairs: (1,3)),
[1,2,1,2] (pairs: (1,3), (2,4)),
[2,1,2] (pairs: (2,4)),
[2,1,2,1] (pairs: (2,4), (3,5)),
[1,2,1,2,1] (pairs: (1,3), (2,4), (3,5)),
[1,2,1] (starting at index 2),
[2,1,2] (starting at index 2)
```

**Example 2:**
```
Input: nums = [3,3,3], k = 3
Output: 1
Explanation: Only the whole array has 3 equal‑pair combinations.
```

---

## Walkthrough

| Step | left | right | freq map | pairs | count |
|------|------|-------|----------|-------|-------|
| Init | 0 | - | {} | 0 | 0 |
| Expand | 0 | 0 | {1:1} | 0 | 0 |
| Expand | 0 | 1 | {1:1,2:1} | 0 | 0 |
| Expand | 0 | 2 | {1:2,2:1} | 1 (pair 1‑3) | 0 |
| Expand | 0 | 3 | {1:2,2:2} | 3 (pairs:1‑3,2‑4,1‑4) | 0 |
| While pairs≥k | 0→1 | 3 | {1:1,2:2} | 2 | + (5‑3)=2 |
| While pairs≥k | 1→2 | 3 | {1:1,2:1} | 1 | + (5‑3)=2 |
| Expand | 2 | 4 | {1:2,2:1} | 2 | + (5‑4)=1 |
| End | – | – | – | – | Total = 7 |

---

## Complexity Analysis

- **Time:** Each element enters and leaves the sliding window at most once → **O(n)**.
- **Space:** Frequency map stores at most the distinct values in `nums` → **O(n)** in the worst case.

---

## Follow-Up Questions

1. How would the solution change if the condition required *exactly* `k` pairs instead of at least `k`?
2. Can the approach be adapted to count subarrays with at most `k` distinct values?
3. How would you handle the problem if the array were streamed and you could only keep a limited window in memory?

---

## Key Takeaway

> Sliding window for "at least k" problems: when the condition is satisfied, count all valid extensions (`n - right`), then shrink from the left.
