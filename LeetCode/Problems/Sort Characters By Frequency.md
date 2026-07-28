# 451. Sort Characters By Frequency

**Difficulty:** 🟡 Medium
**Acceptance:** 73.0%
**LeetCode:** [https://leetcode.com/problems/sort-characters-by-frequency](https://leetcode.com/problems/sort-characters-by-frequency)
**Companies:** Accenture, Amazon, Bloomberg, Epam Systems, Flipkart, Google, Ibm, Meta, Microsoft, Salesforce, Target, Visa, Walmart Labs, Wipro, Zoho

---

## 1. Problem Description

Given a string `s`, return a new string where the characters are sorted in **decreasing order of frequency**. If multiple characters have the same frequency, any order among them is acceptable.

---

## 2. Approach: Bucket Sort — O(n) ✅

```text
FUNCTION frequencySort(s):
    // Count frequency of each character
    count ← map()
    FOR ch IN s:
        INCREMENT count[ch]

    // Create buckets where index = frequency
    buckets ← array of empty lists with size LENGTH(s) + 1
    FOR (ch, freq) IN count:
        APPEND ch TO buckets[freq]

    // Build result from highest frequency to lowest
    result ← []
    FOR freq ← LENGTH(s) DOWN TO 1:
        FOR ch IN buckets[freq]:
            APPEND (ch REPEAT freq) TO result
    RETURN JOIN(result)
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `"tree"` | `"eetr"` (or `"eert"`) |
| `"cccaaa"` | `"cccaaa"` (or `"aaaccc"`) |
| `"Aabb"` | `"bbAa"` (or `"bbaA"`) |

---

## 4. Walkthrough

For `"tree"`:

1. Frequencies: `t:1`, `r:1`, `e:2`.
2. Buckets: index 2 → `[e]`; index 1 → `[t, r]`.
3. Iterate from high to low: add `e` twice → `"ee"`, then `t` and `r` → `"eetr"`.

---

## 5. Complexity Analysis

- **Time:** O(n) – one pass to count, one pass to fill buckets, one pass to build output.
- **Space:** O(n) – frequency map and buckets store at most `n` characters.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the **lexicographically smallest** string among all valid orderings?
- Can this be solved using a **max‑heap** instead of bucket sort? What would be the time trade‑off?

---

## Key Takeaway

> Bucket sort by frequency uses the frequency itself as an index, giving a linear‑time solution for sorting characters by how often they appear.
