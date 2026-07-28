# 1405. Longest Happy String

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/longest-happy-string](https://leetcode.com/problems/longest-happy-string)
**Companies:** Amazon, Bloomberg, Capgemini, Geico, Google, Microsoft, Tiktok, Wayfair

---

## 1. Problem Description

Given counts of 'a', 'b', 'c', construct the longest string where no letter appears more than 2 times consecutively.

---

## 2. Examples

| a | b | c | Output |
|---|---|---|--------|
| 1 | 1 | 7 | "ccaccbcc" |
| 7 | 1 | 0 | "aabaa" |
| 2 | 2 | 1 | "aabbc" |

*Explanation*: The returned strings are the longest possible while never having three identical letters in a row.

---

## 3. Approach: Greedy with Max-Heap — O(a+b+c) ✅

```text
FUNCTION longestDiverseString(a, b, c):
    heap ← MaxHeap()
    IF a > 0: heap.PUSH((a, 'a'))
    IF b > 0: heap.PUSH((b, 'b'))
    IF c > 0: heap.PUSH((c, 'c'))
    result ← []
    WHILE heap IS NOT EMPTY:
        (cnt1, ch1) ← heap.POP()
        IF LENGTH(result) ≥ 2 AND result[-1] = ch1 AND result[-2] = ch1:
            IF heap IS EMPTY: BREAK
            (cnt2, ch2) ← heap.POP()
            APPEND ch2 TO result
            IF cnt2 - 1 > 0: heap.PUSH((cnt2 - 1, ch2))
            heap.PUSH((cnt1, ch1))
        ELSE:
            APPEND ch1 TO result
            IF cnt1 - 1 > 0: heap.PUSH((cnt1 - 1, ch1))
    RETURN JOIN(result)
```

---

## 4. Walkthrough

Consider the input `(a=1, b=1, c=7)`.

| Step | Heap (cnt, char) | Result | Action |
|------|------------------|--------|--------|
| 1 | [(7,'c'),(1,'a'),(1,'b')] | [] | Pop ('c',7) → add 'c' (result: "c"), push (6,'c') |
| 2 | [(6,'c'),(1,'a'),(1,'b')] | "c" | Pop ('c',6) → add 'c' (result: "cc"), push (5,'c') |
| 3 | [(5,'c'),(1,'a'),(1,'b')] | "cc" | Last two are 'c', need second most frequent → pop ('a',1), add 'a' (result: "cca"), push back ('c',5) |
| 4 | [(5,'c'),(1,'b')] | "cca" | Pop ('c',5) → add 'c' (result: "ccac"), push (4,'c') |
| … | … | … | Continue until heap empty |

The final string becomes `"ccaccbcc"`, which respects the no‑three‑consecutive rule and uses as many characters as possible.

---

## 5. Complexity Analysis

- **Time:** Each character is pushed and popped from the heap at most once → `O(a + b + c)`.
- **Space:** The heap holds at most three elements → `O(1)` auxiliary space.

---

## 6. Follow-Up Questions

1. How would the solution change if the alphabet had more than three characters?
2. Can you adapt the algorithm to return **all** longest happy strings instead of just one?
3. What if the constraint was no more than `k` consecutive identical letters?

---

## Key Takeaway

> Greedy: always pick the most frequent character unless it would create a triple. In that case, pick the second most frequent. Max-heap makes this efficient.
