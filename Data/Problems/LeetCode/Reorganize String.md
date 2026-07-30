# 767. Reorganize String

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/reorganize-string](https://leetcode.com/problems/reorganize-string)
**Companies:** Agoda, Amazon, Audible, Bloomberg, Citadel, De Shaw, Ebay, Expedia, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Oracle, Pinterest, Roblox, Salesforce, Tesla, Tiktok, Zoho

---

## 1. Problem Description

Given a string `s`, rearrange characters so that no two adjacent characters are the same. Return `""` if impossible.

---

## 2. Approach: Max-Heap — O(n log 26) = O(n) ✅

```text
FUNCTION reorganizeString(s):
    // Count frequency of each character
    SET freq ← MAP of character → count in s
    // If any character appears more than (n+1)/2, impossible
    FOR each (char, cnt) IN freq:
        IF cnt > (LEN(s) + 1) / 2:
            RETURN ""

    // Build a max‑heap based on remaining count
    SET maxHeap ← MaxHeap of (cnt, char) for each entry in freq
    SET result ← []
    SET prev ← (0, '')  // previous character waiting for cooldown

    WHILE maxHeap IS NOT EMPTY:
        SET (cnt, char) ← maxHeap.POP()
        APPEND char TO result
        // Decrease count because we used one occurrence
        SET cnt ← cnt - 1
        // Re‑insert the previous character if it still has remaining count
        IF prev[0] > 0:
            maxHeap.PUSH(prev)
        // Current character becomes previous for next iteration
        SET prev ← (cnt, char)

    RETURN JOIN(result)
```

---

## 3. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aab"` | `"aba"` | The most frequent `a` is placed with `b` between them. |
| `"aaab"` | `""` | No arrangement can avoid adjacent `a`s. |
| `"abc"` | `"abc"` (or any permutation) | All characters are already distinct.

---

## 4. Walkthrough

Consider the input `"aaabbc"` (length 7).

1. Frequency map: `a:3, b:2, c:1`.
2. Max‑heap initially contains `(3,'a'), (2,'b'), (1,'c')`.
3. **Iteration 1**: pop `(3,'a')` → result `a`. `prev` becomes `(2,'a')`.
4. **Iteration 2**: pop `(2,'b')` → result `ab`. Push `prev` `(2,'a')` back into heap. `prev` becomes `(1,'b')`.
5. **Iteration 3**: heap now `(2,'a'), (1,'c')`. Pop `(2,'a')` → result `aba`. Push `prev` `(1,'b')`. `prev` becomes `(1,'a')`.
6. **Iteration 4**: heap `(1,'b'), (1,'c')`. Pop `(1,'b')` → result `abab`. Push `prev` `(1,'a')`. `prev` becomes `(0,'b')`.
7. **Iteration 5**: heap `(1,'a'), (1,'c')`. Pop `(1,'a')` → result `ababa`. Push `prev` (none, count 0). `prev` becomes `(0,'a')`.
8. **Iteration 6**: heap `(1,'c')`. Pop `(1,'c')` → result `ababac`. Done.

The final string `"ababac"` satisfies the condition.

---

## 5. Complexity Analysis

- **Time:** Each character is pushed and popped from the heap at most once → `O(n log k)` where `k` is the number of distinct characters (≤26). Effectively `O(n)`.
- **Space:** Frequency map `O(k)` and heap `O(k)` → `O(k)` (constant for English letters).

---

## 6. Follow-Up Questions

- How would the solution change if the alphabet size were unbounded?
- Can you adapt the algorithm to return *all* possible valid rearrangements?
- What if the cooldown between identical characters must be greater than 1?

---

## Key Takeaway

> Use a max‑heap to always place the most frequent remaining character, delaying its reuse by one position (cooldown), which guarantees a valid arrangement when one exists.
