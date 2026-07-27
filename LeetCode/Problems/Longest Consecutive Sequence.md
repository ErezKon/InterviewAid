
# 128. Longest Consecutive Sequence

**Difficulty:** 🟡 Medium
**Acceptance:** 47.1%
**LeetCode:** [https://leetcode.com/problems/longest-consecutive-sequence](https://leetcode.com/problems/longest-consecutive-sequence)
**Companies:** Adobe, Amazon, Apple, Atlassian, Bitgo, Bloomberg, Bytedance, Capgemini, Capital One, Cisco, De Shaw, Deloitte, Epam Systems, Goldman Sachs, Google, Ibm, Infosys, Jpmorgan, Linkedin, Lyft, Meta, Microsoft, Myntra, Nvidia, Okta, Oracle, Paypal, Paytm, Phonepe, Roblox, Swiggy, Tcs, Tesla, Tiktok, Uber, Visa, Walmart Labs, Wissen, Zepto, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Sort — O(n log n)](#3-approach-1-sort--on-log-n)
4. [Approach 2: Hash Set — O(n) ✅](#4-approach-2-hash-set--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an unsorted array of integers `nums`, return the length of the **longest consecutive elements sequence**.

You must write an algorithm that runs in **O(n)** time.

---

## 2. Examples

```
Example 1:
  Input:  [100, 4, 200, 1, 3, 2]
  Output: 4
  Reason: [1, 2, 3, 4] is the longest consecutive sequence.

Example 2:
  Input:  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
  Output: 9
  Reason: [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

---

## 3. Approach 1: Sort — O(n log n)

Sort the array, then count consecutive elements.

```
FUNCTION longestConsecutiveSort(nums):
    IF nums IS EMPTY: RETURN 0

    SORT nums
    longest = 1
    current = 1

    FOR i ← 1 TO n - 1:
        IF nums[i] == nums[i-1]:
            CONTINUE                    // skip duplicates
        ELSE IF nums[i] == nums[i-1] + 1:
            current += 1
        ELSE:
            current = 1

        longest = MAX(longest, current)

    RETURN longest
```

Doesn't meet the O(n) requirement.

---

## 4. Approach 2: Hash Set — O(n) ✅

### Key Insight

Put all numbers in a set. Only **start counting from sequence starts** — a number `x` is a sequence start if `x - 1` is NOT in the set.

This ensures each element is visited at most twice total (once in the set-building, once when traversing its sequence).

```
FUNCTION longestConsecutive(nums):

    numSet  = SET(nums)
    longest = 0

    FOR each num IN numSet:

        // Only start counting from sequence beginnings
        IF (num - 1) NOT IN numSet:

            currentNum = num
            length = 1

            WHILE (currentNum + 1) IN numSet:
                currentNum += 1
                length += 1

            longest = MAX(longest, length)

    RETURN longest
```

### Why O(n)?

- Each number is a sequence start at most once.
- The inner `WHILE` loop collectively traverses each sequence once.
- Total work across all iterations = n (each element is visited at most twice).

---

## 5. Walkthrough

```
nums = [100, 4, 200, 1, 3, 2]
numSet = {100, 4, 200, 1, 3, 2}

num=100:  99 NOT in set → sequence start
          100: length=1, 101 not in set → STOP
          longest = 1

num=4:    3 IN set → NOT a sequence start → SKIP

num=200:  199 NOT in set → sequence start
          200: length=1, 201 not in set → STOP
          longest = 1

num=1:    0 NOT in set → sequence start
          1→2→3→4: length=4, 5 not in set → STOP
          longest = 4  ★

num=3:    2 IN set → NOT a sequence start → SKIP

num=2:    1 IN set → NOT a sequence start → SKIP

Result: 4 ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort | O(n log n) | O(1) or O(n) |
| **Hash Set** | **O(n)** | **O(n)** |

---

## 7. Follow-Up Questions

### 7.1 What if we need the actual sequence?

Track the starting number and length of the best sequence:

```
FUNCTION longestConsecutiveSeq(nums):
    numSet = SET(nums)
    bestStart = 0
    bestLen = 0

    FOR each num IN numSet:
        IF (num - 1) NOT IN numSet:
            length = 1
            WHILE (num + length) IN numSet:
                length += 1

            IF length > bestLen:
                bestLen = length
                bestStart = num

    RETURN [bestStart, bestStart + 1, ..., bestStart + bestLen - 1]
```

### 7.2 Streaming version — numbers arrive one at a time?

Use **Union-Find** or a hash map that stores `{num: length of sequence containing num}`. When a new number arrives, check if `num-1` and `num+1` exist and merge sequences.

### 7.3 What about 2D consecutive sequences?

For a matrix, this becomes a graph problem. Define "consecutive" based on adjacency and value difference of 1, then use DFS/BFS to find the longest path.

### 7.4 Longest Increasing Subsequence (different problem)

LIS (#300) is NOT about consecutive values — it's about subsequences (non-contiguous) that are increasing. Uses DP or patience sorting in O(n log n). Different problem, different technique.

---

## Key Takeaway

> The trick is **only starting from sequence beginnings**. The `if (num - 1) not in set` check ensures each sequence is traversed exactly once, giving amortized O(n). This is a beautiful example of how a simple observation — skipping non-starts — turns a seemingly quadratic problem into a linear one.
