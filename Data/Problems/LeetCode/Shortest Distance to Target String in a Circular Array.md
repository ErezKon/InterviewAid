# 2515. Shortest Distance to Target String in a Circular Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array](https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array)
**Companies:** Amazon, Bloomberg, Microsoft, Salesforce

---

## Problem Description

You are given a **0-indexed** **circular** string array `words` and a string `target`. A **circular array** means that the array's end connects to the array's beginning.

- Formally, the next element of `words[i]` is `words[(i + 1) % n]` and the previous element of `words[i]` is `words[(i - 1 + n) % n]`, where `n` is the length of `words`.

Starting from `startIndex`, you can move to either the next word or the previous word with `1` step at a time.

Return *the **shortest** distance needed to reach the string* `target`. If the string `target` does not exist in `words`, return `-1`.

**Constraints:**

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` and `target` consist of only lowercase English letters.
- `0 <= startIndex < words.length`

---

## Approach

```text
FUNCTION shortestDistanceCircular(words, target, startIndex):
    n ← len(words)
    minDist ← n
    FOR i ← 0 TO n-1:
        IF words[i] == target:
            // distance forward or backward around the circle
            dist ← MIN(ABS(i - startIndex), n - ABS(i - startIndex))
            minDist ← MIN(minDist, dist)
    RETURN minDist IF minDist < n ELSE -1
```

---

## Examples

```
Example 1:
  Input: words = ["hello","i","am","leetcode","hello"], target = "hello", startIndex = 1
  Output: 1
  Explanation: We start from index 1 and can reach "hello" by
  - moving 3 units to the right to reach index 4.
  - moving 2 units to the left to reach index 4.
  - moving 4 units to the right to reach index 0.
  - moving 1 unit to the left to reach index 0.
  The shortest distance to reach "hello" is 1.
```

```
Example 2:
  Input: words = ["a","b","leetcode"], target = "leetcode", startIndex = 0
  Output: 1
  Explanation: We start from index 0 and can reach "leetcode" by
  - moving 2 units to the right to reach index 2.
  - moving 1 unit to the left to reach index 2.
  The shortest distance to reach "leetcode" is 1.
```

```
Example 3:
  Input: words = ["i","eat","leetcode"], target = "ate", startIndex = 0
  Output: -1
  Explanation: Since "ate" does not exist in words, we return -1.
```

---

## Walkthrough

1. Iterate over every position `i` in `words`.
2. When `words[i]` matches `target`, compute the circular distance: the smaller of moving forward (`ABS(i-startIndex)`) or backward (`n-ABS(i-startIndex)`).
3. Keep the smallest distance seen.
4. If no occurrence is found, return `-1`.

---

## Complexity Analysis

- **Time:** O(n) – a single pass over the array.
- **Space:** O(1) – only a few scalar variables.

---

## Key Takeaway

> A linear scan combined with circular distance calculation yields the shortest steps to the target in a circular array.
