# 2060. Check if an Original String Exists Given Two Encoded Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings](https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings)
**Companies:** Bitgo, Meta

---

## 1. Problem Description

An original string, consisting of lowercase English letters, can be encoded by the following steps:

- Arbitrarily **split** it into a **sequence** of some number of **non-empty** substrings.
- Arbitrarily choose some elements (possibly none) of the sequence, and **replace** each with **its length** (as a numeric string).
- **Concatenate** the sequence as the encoded string.

For example, **one way** to encode an original string `"abcdefghijklmnop"` might be:

- Split it as a sequence: `["ab", "cdefghijklmn", "o", "p"]`.
- Choose the second and third elements to be replaced by their lengths, respectively. The sequence becomes `["ab", "12", "1", "p"]`.
- Concatenate the elements of the sequence to get the encoded string: `"ab121p"`.

Given two encoded strings `s1` and `s2`, consisting of lowercase English letters and digits `1-9` (inclusive), return `true` *if there exists an original string that could be encoded as **both*** `s1` *and* `s2`*. Otherwise, return* `false`.

**Note:** The test cases are generated such that the number of consecutive digits in `s1` and `s2` does not exceed `3`.

**Constraints:**
- `1 <= s1.length, s2.length <= 40`
- `s1` and `s2` consist of digits `1-9` (inclusive), and lowercase English letters only.
- The number of consecutive digits in `s1` and `s2` does not exceed `3`.

---

## 2. Key Insight

> DP with state `(i, j, diff)` where `i`, `j` are positions in the two strings and `diff` tracks the balance of unmatched wildcard characters (positive = first string ahead, negative = second ahead). Transitions consume letters when `diff == 0` or expand digit sequences to adjust `diff`.

---

## 3. Examples

```
Example 1:
  Input: s1 = "internationalization", s2 = "i18n"
  Output: true
  Explanation: It is possible that "internationalization" was the original string.
  - "internationalization"
    -> Split:       ["internationalization"]
    -> Do not replace any element
    -> Concatenate:  "internationalization", which is s1.
  - "internationalization"
    -> Split:       ["i", "nternationalizatio", "n"]
    -> Replace:     ["i", "18",                 "n"]
    -> Concatenate:  "i18n", which is s2
```

```
Example 2:
  Input: s1 = "l123e", s2 = "44"
  Output: true
  Explanation: It is possible that "leetcode" was the original string.
  - "leetcode"
    -> Split:      ["l", "e", "et", "cod", "e"]
    -> Replace:    ["l", "1", "2",  "3",   "e"]
    -> Concatenate: "l123e", which is s1.
  - "leetcode"
    -> Split:      ["leet", "code"]
    -> Replace:    ["4",    "4"]
    -> Concatenate: "44", which is s2.
```

```
Example 3:
  Input: s1 = "a5b", s2 = "c5b"
  Output: false
  Explanation: It is impossible.
  - The original string encoded as s1 must start with the letter 'a'.
  - The original string encoded as s2 must start with the letter 'c'.
```

---

## 4. Walkthrough

Consider `s1 = "a2c"` and `s2 = "3"`:
1. Start at `(0,0,0)`. `s1[0] = 'a'`, `s2[0] = '3'` (digit).
2. Expand digit `3` in `s2` → `diff = -3` (s2 ahead by 3 wildcards).
3. Consume `'a'` from `s1` while `diff < 0` → `diff = -2`.
4. Expand digit `2` in `s1` → `diff = 0` (now both strings aligned).
5. Remaining `'c'` in `s1` matches the third wildcard from `s2` → `diff = 0` and both strings end.
6. All characters matched, return `true`.

---

## 5. Complexity Analysis

- **Time:** O(n × m × D) where `n` and `m` are the lengths of the two strings and `D` is the range of possible `diff` values (bounded by the maximum total wildcard length, ≤ 2000).
- **Space:** O(n × m × D) for memoization of DP states.

---

## 6. Follow-Up Questions

- How would the solution change if digits could represent any length up to 10⁹?
- Can you adapt the DP to also output one possible original string?
- What if the encodings may contain wildcard characters `*` that match exactly one arbitrary letter?

---

## Key Takeaway

> Encoding matching reduces to a DP that tracks the difference in unmatched wildcard characters between the two strings, enabling systematic exploration of all possible expansions.
