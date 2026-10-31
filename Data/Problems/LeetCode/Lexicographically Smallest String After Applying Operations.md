# 1625. Lexicographically Smallest String After Applying Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations](https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations)
**Companies:** Amazon, Jpmorgan

---

## 1. Problem Description

You are given a string `s` of **even length** consisting of digits from `0` to `9`, and two integers `a` and `b`.

You can apply either of the following two operations any number of times and in any order on `s`:

- Add `a` to all odd indices of `s` **(0-indexed)**. Digits post `9` are cycled back to `0`. For example, if `s = "3456"` and `a = 5`, `s` becomes `"3951"`.
- Rotate `s` to the right by `b` positions. For example, if `s = "3456"` and `b = 1`, `s` becomes `"6345"`.

Return *the **lexicographically smallest** string you can obtain by applying the above operations any number of times on* `s`.

A string `a` is lexicographically smaller than a string `b` (of the same length) if in the first position where `a` and `b` differ, string `a` has a letter that appears earlier in the alphabet than the corresponding letter in `b`. For example, `"0158"` is lexicographically smaller than `"0190"` because the first position they differ is at the third letter, and `'5'` comes before `'9'`.

**Constraints:**
- `2 <= s.length <= 100`
- `s.length` is even.
- `s` consists of digits from `0` to `9` only.
- `1 <= a <= 9`
- `1 <= b <= s.length - 1`

---

## 2. Approach: BFS / Enumerate States — O(n·states) ✅

```text
FUNCTION findLexSmallestString(s, a, b):
    visited ← SET()
    queue ← [s]
    best ← s
    WHILE queue NOT EMPTY:
        curr ← queue.DEQUEUE()
        IF curr IN visited: CONTINUE
        visited.ADD(curr)
        best ← MIN(best, curr)
        // Operation 1: add a to odd indices
        op1 ← ADD_A_TO_ODD(curr, a)
        // Operation 2: rotate by b
        op2 ← ROTATE_RIGHT(curr, b)
        queue.ENQUEUE(op1)
        queue.ENQUEUE(op2)
    RETURN best
```

---

## 3. Examples

**Example 1:**
```
Input: s = "5525", a = 9, b = 2
Output: "2050"
Explanation: We can apply the following operations:
Start:  "5525"
Rotate: "2555"
Add:    "2454"
Add:    "2353"
Rotate: "5323"
Add:    "5222"
Add:    "5121"
Rotate: "2151"
Add:    "2050"
There is no way to obtain a string that is lexicographically smaller than "2050".
```

**Example 2:**
```
Input: s = "74", a = 5, b = 1
Output: "24"
Explanation: We can apply the following operations:
Start:  "74"
Rotate: "47"
Add:    "42"
Rotate: "24"
There is no way to obtain a string that is lexicographically smaller than "24".
```

**Example 3:**
```
Input: s = "0011", a = 4, b = 2
Output: "0011"
Explanation: There are no sequence of operations that will give us a lexicographically smaller string than "0011".
```

---

## 4. Walkthrough

Take `s = "1234567"`, `a = 5`, `b = 2`.

1. Start with `"1234567"` (best = `"1234567"`).
2. Apply operation 1 → add 5 to odd indices (1-based): positions 1,3,5,7 become `6,8,0,2` → `"6284502"`.
3. Apply operation 2 → rotate right by 2 → `"6712345"`.
4. Continue expanding each new string; the smallest string encountered is `"0234567"`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(10·n/gcd(n,b)·10) states | O(states) |

---

## 6. Follow-Up Questions

1. How would the solution change if the addition operation applied to even indices instead?
2. Can you prove the state space is bounded by `10 * n / gcd(n, b)`?
3. What if the rotation could be left or right?

---

## Key Takeaway

> BFS over all reachable states (add + rotate) efficiently finds the lexicographically smallest string because the state space is limited by digit cycles and rotation periodicity.
