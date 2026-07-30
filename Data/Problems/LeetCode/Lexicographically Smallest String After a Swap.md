# 3216. Lexicographically Smallest String After a Swap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap](https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap)
**Companies:** Jpmorgan

---

## 1. Problem Description

Swap at most one pair of adjacent digits with the same parity to make the number as small as possible.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| "1234" | "1234" | No adjacent same‑parity pair where the left digit is larger, so no swap improves the string. |
| "4321" | "3421" | The first adjacent same‑parity pair is `4` and `3` (both even/odd? actually 4 even, 3 odd, not same). The first same‑parity decreasing pair is `3` and `2` (both odd/even? 3 odd, 2 even, not same). The first valid pair is `2` and `1` (both even? 2 even, 1 odd). Actually correct example: "2210" → swap first `2` and `2` (same parity) no effect, better example: "3102" → swap `1` and `0` (both odd/even? 1 odd, 0 even) not same. Use "1325" → swap `3` and `2` (both odd/even? 3 odd, 2 even) not same. Provide a valid example: "5543" → swap first `5` and `5` (same parity) no change, but swapping `5` and `4` (different parity) not allowed. Better example from LeetCode: "1234" stays same, "3412" → swap `4` and `1` (different parity) not allowed, so result "3412". We'll give a simple valid example: "2210" → swap the second `2` and `1` (different parity) not allowed, so result stays "2210". Actually need a case where swap occurs: "13542" → adjacent same parity pair `5` and `4` not same, `4` and `2` both even and `4 > 2`, swapping gives "13524" which is smaller.

## 3. Approach: Greedy — O(n) ✅

```text
FUNCTION getSmallestString(s):
    s ← LIST(s)
    FOR i ← 0 TO LENGTH(s) - 2:
        a ← INTEGER(s[i])
        b ← INTEGER(s[i+1])
        IF a MOD 2 = b MOD 2 AND a > b:
            SWAP(s[i], s[i+1])
            BREAK
    RETURN JOIN(s)
```

---

## 4. Walkthrough

Consider the string `"13542"`:
1. Convert to list: `[1,3,5,4,2]`.
2. Iterate i=0: `1` and `3` both odd but `1 < 3` → no swap.
3. i=1: `3` and `5` both odd, `3 < 5` → no swap.
4. i=2: `5` (odd) and `4` (even) → parity differs → skip.
5. i=3: `4` and `2` both even and `4 > 2` → condition satisfied.
6. Swap positions 3 and 4 → list becomes `[1,3,5,2,4]`.
7. Join list → result `"13524"`, the smallest possible string after at most one allowed swap.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – single pass over the string | O(n) – to store characters as a list |

---

## 6. Follow-Up Questions

* How would the solution change if any number of swaps were allowed?
* What if swaps could be performed between any two same‑parity digits, not just adjacent ones?
* Can the algorithm be extended to handle very long strings efficiently in a streaming fashion?

---

## 7. Key Takeaway

> Find the first adjacent pair with same parity where swapping decreases the number. Only one swap allowed — take the leftmost improvement.
