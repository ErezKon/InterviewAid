# 3023. Find Pattern in Infinite Stream I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-pattern-in-infinite-stream-i](https://leetcode.com/problems/find-pattern-in-infinite-stream-i)
**Companies:** Uber

---

## Problem Description
> *Note: statement verified against the official problem text (premium; via doocs/leetcode). The Approach/Walkthrough below were written for an older, non-official description (integer stream, boolean result); the sliding-window idea still applies, but the official answer is the first starting index of `pattern` in a binary stream.*

You are given a binary array `pattern` and an object `stream` of class `InfiniteStream` representing a **0-indexed** infinite stream of bits.

The class `InfiniteStream` contains the following function:

- `int next()`: Reads a **single** bit (which is either `0` or `1`) from the stream and returns it.

Return *the **first starting** index where the pattern matches the bits read from the stream*. For example, if the pattern is `[1, 0]`, the first match is the highlighted part in the stream `[0, **1, 0**, 1, ...]`.

**Constraints:**
- `1 <= pattern.length <= 100`
- `pattern` consists only of `0` and `1`.
- `stream` consists only of `0` and `1`.
- The input is generated such that the pattern's start index exists in the first `10^5` bits of the stream.

## Examples
```
Example 1:
  Input: stream = [1,1,1,0,1,1,1,...], pattern = [0,1]
  Output: 3
  Explanation: The first occurrence of the pattern [0,1] is highlighted in the stream [1,1,1,**0,1**,...], which starts at index 3.
```

```
Example 2:
  Input: stream = [0,0,0,0,...], pattern = [0]
  Output: 0
  Explanation: The first occurrence of the pattern [0] is highlighted in the stream [**0**,...], which starts at index 0.
```

```
Example 3:
  Input: stream = [1,0,1,1,0,1,1,0,1,...], pattern = [1,1,0,1]
  Output: 2
  Explanation: The first occurrence of the pattern [1,1,0,1] is highlighted in the stream [1,0,**1,1,0,1**,...], which starts at index 2.
```

## Approach
Because the stream is infinite, we cannot materialize it entirely. Instead, generate elements on-the-fly while maintaining a sliding window of size equal to `len(pattern)`. Compare the window to the pattern at each step; stop early if a match is found.

```text
FUNCTION containsPattern(pattern):
    SET m ← LENGTH(pattern)
    IF m == 0: RETURN true
    // Initialize sliding window
    SET window ← []
    WHILE true:
        SET val ← next()               // get next stream element
        APPEND val TO window
        IF LENGTH(window) > m:
            REMOVE FIRST ELEMENT FROM window
        IF LENGTH(window) == m AND window == pattern:
            RETURN true
        // Optional termination condition for practical runs
        IF some reasonable limit reached:
            RETURN false
```

## Walkthrough
For `pattern = [2,3,5]` and a Fibonacci-like stream `1,2,3,5,8,...`:
1. Generate `1` → window `[1]` (size < 3).
2. Generate `2` → window `[1,2]`.
3. Generate `3` → window `[1,2,3]` (size = 3, not equal to pattern).
4. Generate `5` → window slides to `[2,3,5]` → matches pattern → return `true`.

## Complexity Analysis
- **Time:** O(N) where N is the number of generated elements until a match or termination; each step does O(1) work.
- **Space:** O(m) for the sliding window of size `m = len(pattern)`.

## Follow-Up Questions
1. How would you handle multiple patterns simultaneously?
2. Can you use a rolling hash to compare windows in O(1) time?
3. What changes if the stream can be reset or accessed randomly?

## Key Takeaway
A sliding window over a lazily generated stream lets you detect a fixed-size pattern using constant extra space, stopping as soon as the pattern is found.
