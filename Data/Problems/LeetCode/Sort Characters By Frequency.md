# 451. Sort Characters By Frequency

**Difficulty:** 🟡 Medium
**Acceptance:** 73.0%
**LeetCode:** [https://leetcode.com/problems/sort-characters-by-frequency](https://leetcode.com/problems/sort-characters-by-frequency)
**Companies:** Accenture, Amazon, Bloomberg, Epam Systems, Flipkart, Google, Ibm, Meta, Microsoft, Salesforce, Target, Visa, Walmart Labs, Wipro, Zoho

---

## 1. Problem Description

Given a string `s`, sort it in **decreasing order** based on the **frequency** of the characters. The **frequency** of a character is the number of times it appears in the string.

Return *the sorted string*. If there are multiple answers, return *any of them*.

**Constraints:**
- `1 <= s.length <= 5 * 10⁵`
- `s` consists of uppercase and lowercase English letters and digits.

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

```
Example 1:
  Input: s = "tree"
  Output: "eert"
  Explanation: 'e' appears twice while 'r' and 't' both appear once.
    So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
```

```
Example 2:
  Input: s = "cccaaa"
  Output: "aaaccc"
  Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
    Note that "cacaca" is incorrect, as the same characters must be together.
```

```
Example 3:
  Input: s = "Aabb"
  Output: "bbAa"
  Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
    Note that 'A' and 'a' are treated as two different characters.
```

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
