# 1520. Maximum Number of Non-Overlapping Substrings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings](https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s` of lowercase letters, you need to find the maximum number of **non-empty** substrings of `s` that meet the following conditions:

1. The substrings do not overlap, that is for any two substrings `s[i..j]` and `s[x..y]`, either `j < x` or `i > y` is true.
2. A substring that contains a certain character `c` must also contain all occurrences of `c`.

Find *the maximum number of substrings that meet the above conditions*. If there are multiple solutions with the same number of substrings, *return the one with minimum total length.* It can be shown that there exists a unique solution of minimum total length.

Notice that you can return the substrings in **any** order.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` contains only lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "adefaddaccc"
  Output: ["e","f","ccc"]
  Explanation: The following are all the possible substrings that meet the conditions:
    [
      "adefaddaccc"
      "adefadda",
      "ef",
      "e",
      "f",
      "ccc",
    ]
    If we choose the first string, we cannot choose anything else and we'd get only 1. If we choose "adefadda",
    we are left with "ccc" which is the only one that doesn't overlap, thus obtaining 2 substrings. Notice also,
    that it's not optimal to choose "ef" since it can be split into two. Therefore, the optimal way is to choose
    ["e","f","ccc"] which gives us 3 substrings. No other solution of the same number of substrings exist.
```

```
Example 2:
  Input: s = "abbaccd"
  Output: ["d","bb","cc"]
  Explanation: Notice that while the set of substrings ["d","abba","cc"] also has length 3, it's considered
    incorrect since it has larger total length.
```

---

## Key Insight

> For each character, compute the **tightest valid interval** [first, last] that includes all occurrences of every character within it. Then greedily select the **maximum non-overlapping intervals** sorted by right endpoint (classic interval scheduling).

---

## Approach

```
FUNCTION maxNumOfSubstrings(s)
    // Step 1: For each char, find first and last occurrence
    first, last ← arrays of 26

    // Step 2: Expand intervals — if char c's range contains char d, expand to include all of d
    FOR each char c DO
        i ← first[c]
        WHILE i ≤ last[c] DO
            IF first[s[i]] < first[c] THEN mark invalid OR expand
            last[c] ← MAX(last[c], last[s[i]])
            i ← i + 1

    // Step 3: Collect valid intervals, sort by right endpoint
    // Step 4: Greedy non-overlapping selection (earliest ending first)
    SORT intervals by right endpoint
    result ← [], prevEnd ← -1
    FOR each interval DO
        IF interval.start > prevEnd THEN
            result.ADD(s[interval.start : interval.end + 1])
            prevEnd ← interval.end

    RETURN result
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × 26)** — interval expansion per character |
| Space  | **O(26)** — character ranges |

---

## Follow-Up Questions

1. **Why expand intervals?**
   If character `c`'s range contains `d`, we must include all of `d`'s occurrences too.

2. **How is this like interval scheduling?**
   After computing valid intervals, it's exactly "max non-overlapping intervals sorted by end."

---

## Key Takeaway

> **Character interval expansion + greedy interval scheduling** — compute the tightest valid range for each character, expand as needed, then greedily select non-overlapping intervals by earliest end.
