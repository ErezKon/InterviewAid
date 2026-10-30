# 358. Rearrange String k Distance Apart

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/rearrange-string-k-distance-apart](https://leetcode.com/problems/rearrange-string-k-distance-apart)
**Companies:** Amazon, Google, Tiktok, Zomato

---

## Problem Description
Given a string `s` and an integer `k`, rearrange `s` such that the same characters are **at least** distance `k` from each other. If it is not possible to rearrange the string, return an empty string `""`.

**Constraints:**

- `1 <= s.length <= 3 * 10⁵`
- `s` consists of only lowercase English letters.
- `0 <= k <= s.length`

## Examples

```
Example 1:
  Input: s = "aabbcc", k = 3
  Output: "abcabc"
  Explanation: The same letters are at least a distance of 3 from each other.
```

```
Example 2:
  Input: s = "aaabc", k = 3
  Output: ""
  Explanation: It is not possible to rearrange the string.
```

```
Example 3:
  Input: s = "aaadbbcc", k = 2
  Output: "abacabcd"
  Explanation: The same letters are at least a distance of 2 from each other.
```

## Approach
Use a max‑heap to always pick the character with the highest remaining count. After placing a character, put it into a waiting queue for `k` steps before it can be used again. When the waiting period expires, push it back into the heap if it still has remaining occurrences.

```text
FUNCTION rearrangeString(s, k):
    IF k <= 1:
        RETURN s
    freq ← MAP<CHAR, INT>
    FOR ch IN s:
        freq[ch] ← freq.get(ch, 0) + 1
    maxHeap ← MAX-HEAP of (count, ch) for each entry in freq
    waitQueue ← QUEUE of (availableStep, count, ch)
    result ← []
    step ← 0
    WHILE maxHeap NOT EMPTY OR waitQueue NOT EMPTY:
        IF maxHeap NOT EMPTY:
            (cnt, ch) ← POP maxHeap
            APPEND result WITH ch
            cnt ← cnt - 1
            IF cnt > 0:
                ENQUEUE waitQueue WITH (step + k, cnt, ch)
        IF waitQueue NOT EMPTY AND FRONT(waitQueue).availableStep == step:
            (avail, cnt, ch) ← DEQUEUE waitQueue
            PUSH maxHeap WITH (cnt, ch)
        step ← step + 1
    IF LENGTH(result) != LENGTH(s):
        RETURN ""
    RETURN JOIN(result)
```

## Walkthrough
`s = "aabbcc", k = 3`
1. Build heap: [(2,'a'),(2,'b'),(2,'c')].
2. Step 0: pop `'a'`, result=`a`, enqueue `(3,1,'a')`.
3. Step 1: pop `'b'`, result=`ab`, enqueue `(4,1,'b')`.
4. Step 2: pop `'c'`, result=`abc`, enqueue `(5,1,'c')`.
5. Steps 3‑5: waiting entries become available and are pushed back, producing `abcabc`.

## Complexity Analysis
- **Time:** O(n log σ) where n is length of `s` and σ is number of distinct characters (heap operations). 
- **Space:** O(σ) for the heap and waiting queue.

## Follow-Up Questions
1. How would the solution change if `k` could be larger than the string length?
2. Can you solve the problem using a bucket‑based approach without a heap?
3. How to adapt the algorithm for Unicode characters with large alphabets?

## Key Takeaway
A max‑heap combined with a waiting queue enforces the `k`‑distance constraint while always selecting the most frequent available character.
