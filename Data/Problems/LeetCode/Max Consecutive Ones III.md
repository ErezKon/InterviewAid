# 1004. Max Consecutive Ones III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-consecutive-ones-iii](https://leetcode.com/problems/max-consecutive-ones-iii)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Citadel, Goldman Sachs, Google, Ibm, Infosys, Linkedin, Meta, Microsoft, Motive, Nutanix, Oracle, Roku, Salesforce, Tiktok, Yandex

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sliding Window — O(n)](#approach-sliding-window--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`'s in the array if you can flip at most `k` `0`'s.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `nums[i]` is either `0` or `1`
- `0 ≤ k ≤ nums.length`

---

## Examples

**Example 1:**
```
Input:  nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: Flip the two 0's at indices 5 and 10 (or 3 and 4, etc.)
             → [1,1,1,0,0,1,1,1,1,1,1]  ← window of 6 ones
```

**Example 2:**
```
Input:  nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: Flip 0's at indices 4, 5, 9 → window covers indices 2..11
```

---

## Key Insight

> Instead of actually flipping zeros, **reframe the problem**: find the longest subarray that contains **at most k zeros**. This is a classic sliding window / two-pointer pattern on a binary alphabet.

---

## Approach: Sliding Window — O(n) ✅

Maintain a window `[left, right]` and a count of zeros inside it. Expand `right` one step at a time; when the zero count exceeds `k`, shrink from the `left` until valid again.

```
FUNCTION longestOnes(nums, k):
    left = 0
    zeros = 0
    maxLen = 0

    FOR right ← 0 TO n - 1:
        IF nums[right] == 0:
            zeros += 1

        WHILE zeros > k:
            IF nums[left] == 0:
                zeros -= 1
            left += 1

        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

---

## Walkthrough

```
nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],  k = 2
```

| right | nums[right] | zeros | left | window          | length |
|-------|-------------|-------|------|-----------------|--------|
| 0     | 1           | 0     | 0    | [1]             | 1      |
| 1     | 1           | 0     | 0    | [1,1]           | 2      |
| 2     | 1           | 0     | 0    | [1,1,1]         | 3      |
| 3     | 0           | 1     | 0    | [1,1,1,0]       | 4      |
| 4     | 0           | 2     | 0    | [1,1,1,0,0]     | 5      |
| 5     | 0           | 3→2  | 4    | [0,0,1,1,1,1,0] shrinks → [0,0,1,1,1,1] ... left moves to 4 | 2 |
| ...   | ...         | ...   | ...  | best window eventually covers indices 5–10 | **6** |

**Result:** 6 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n)** | O(1) |

Each element is visited at most twice (once by `right`, once by `left`), so total work is linear.

---

## Follow-Up Questions

**Q1: What if the array is not binary — e.g., "longest substring with at most k replacements" (LeetCode 424)?**
Use the same sliding window but track character frequencies; shrink when `windowLen - maxFreq > k`.

**Q2: Can you solve this without the inner `WHILE` — i.e., never shrink the window?**
Yes. Instead of shrinking, just move `left` forward by 1 when `zeros > k`. The window never shrinks, so `maxLen` is implicitly the window size at the end. This variant runs in O(n) with a single pass (no inner loop).

**Q3: What if you had to return the indices of the zeros you flipped?**
Store zero positions in a queue. When the window is invalid, pop from the front to find the new `left`.

---

## Key Takeaway

> **"Maximum consecutive ones with k flips" is equivalent to "longest subarray with at most k zeros" — a textbook sliding-window problem.** Reframing "flip" as "tolerate" removes the need for any mutation and unlocks an O(n) two-pointer solution.
