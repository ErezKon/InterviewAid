# 2085. Count Common Words With One Occurrence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-common-words-with-one-occurrence](https://leetcode.com/problems/count-common-words-with-one-occurrence)
**Companies:** Jane Street

---

## 1. Problem Description

Given two string arrays `words1` and `words2`, count the number of words that appear exactly once in **both** arrays.

---

## 2. Examples

| words1 | words2 | Output |
|--------|--------|--------|
| `["leetcode","love","leetcode","expert"]` | `["love","leetcode","expert","expert"]` | `1` |
| `["a","b","c"]` | `["a","b","c","d"]` | `3` |

---

## 3. Approach

**Algorithm:** Two Frequency Maps

> Build a frequency map for each array, then iterate over one map and count words whose frequency is exactly `1` in both maps.

```text
FUNCTION countCommonOnce(words1, words2):
    freq1 ← Counter()
    FOR w IN words1:
        freq1[w] += 1
    
    freq2 ← Counter()
    FOR w IN words2:
        freq2[w] += 1
    
    SET result ← 0
    FOR word, cnt IN freq1.items():
        IF cnt == 1 AND freq2.get(word, 0) == 1:
            SET result ← result + 1
    RETURN result
```

---

## 4. Walkthrough

Consider `words1 = ["leetcode","love","leetcode","expert"]` and `words2 = ["love","leetcode","expert","expert"]`.

1. **freq1** → `{ "leetcode":2, "love":1, "expert":1 }`
2. **freq2** → `{ "love":1, "leetcode":1, "expert":2 }`
3. Iterate `freq1`:
   - `"leetcode"` → cnt=2 (skip)
   - `"love"` → cnt=1 and `freq2["love"]==1` → result=1
   - `"expert"` → cnt=1 but `freq2["expert"]==2` (skip)
4. Final result = 1.

---

## 5. Complexity Analysis

- **Time:** `O(n + m)` where *n* and *m* are the lengths of `words1` and `words2`.
- **Space:** `O(u + v)` for the two hash maps, where *u* and *v* are the numbers of unique words in each array.

---

## 6. Follow-Up Questions

1. How would you modify the solution to count words that appear exactly *k* times in both arrays?
2. Can you solve the problem with a single pass using a combined hash map?
3. What if the input arrays are extremely large and cannot fit into memory?

---

## Key Takeaway

> Counting frequencies in each array separately and then intersecting the maps yields a linear‑time solution for finding words that appear exactly once in both.
