# 1405. Longest Happy String

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/longest-happy-string](https://leetcode.com/problems/longest-happy-string)
**Companies:** Amazon, Bloomberg, Capgemini, Geico, Google, Microsoft, Tiktok, Wayfair

---

## 1. Problem Description

A string `s` is called **happy** if it satisfies the following conditions:

- `s` only contains the letters `'a'`, `'b'`, and `'c'`.
- `s` does not contain any of `"aaa"`, `"bbb"`, or `"ccc"` as a substring.
- `s` contains **at most** `a` occurrences of the letter `'a'`.
- `s` contains **at most** `b` occurrences of the letter `'b'`.
- `s` contains **at most** `c` occurrences of the letter `'c'`.

Given three integers `a`, `b`, and `c`, return *the **longest possible happy **string*. If there are multiple longest happy strings, return *any of them*. If there is no such string, return *the empty string *`""`.

A **substring** is a contiguous sequence of characters within a string.

**Constraints:**
- `0 <= a, b, c <= 100`
- `a + b + c > 0`

---

## 2. Examples

**Example 1:**
```
Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.
```

**Example 2:**
```
Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It is the only correct answer in this case.
```

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
