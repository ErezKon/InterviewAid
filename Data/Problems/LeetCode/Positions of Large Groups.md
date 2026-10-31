# 830. Positions of Large Groups

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/positions-of-large-groups](https://leetcode.com/problems/positions-of-large-groups)
**Companies:** Google

---

## Problem Description

In a string `s` of lowercase letters, these letters form consecutive groups of the same character.

For example, a string like `s = "abbxxxxzyy"` has the groups `"a"`, `"bb"`, `"xxxx"`, `"z"`, and `"yy"`.

A group is identified by an interval `[start, end]`, where `start` and `end` denote the start and end indices (inclusive) of the group. In the above example, `"xxxx"` has the interval `[3,6]`.

A group is considered **large** if it has 3 or more characters.

Return *the intervals of every **large** group sorted in **increasing order by start index***.

**Constraints:**
- `1 <= s.length <= 1000`
- `s` contains lowercase English letters only.

## Examples

**Example 1:**
```
Input: s = "abbxxxxzzy"
Output: [[3,6]]
Explanation: "xxxx" is the only large group with start index 3 and end index 6.
```

**Example 2:**
```
Input: s = "abc"
Output: []
Explanation: We have groups "a", "b", and "c", none of which are large groups.
```

**Example 3:**
```
Input: s = "abcdddeeeeaabbbcd"
Output: [[3,5],[6,9],[12,14]]
Explanation: The large groups are "ddd", "eeee", and "bbb".
```

## Approach
**Algorithm:** Single-pass scan using two pointers (start `i` and end `j`).
**Key Insight:** While expanding `j` as long as characters match, the length of the segment is `j-i`. When the segment ends, record it if length ≥ 3, then move `i` to `j`.

```text
FUNCTION largeGroupPositions(s):
    result ← []
    i ← 0
    n ← LENGTH(s)
    WHILE i < n:
        j ← i
        WHILE j < n AND s[j] == s[i]:
            j ← j + 1
        IF j - i >= 3:
            APPEND [i, j-1] TO result
        i ← j
    RETURN result
```

## Walkthrough
For `s = "abbxxxxzyy"`:
| i | j after inner loop | segment | length | recorded |
|---|--------------------|---------|--------|----------|
|0|1|"a"|1|no|
|1|3|"bb"|2|no|
|3|7|"xxxx"|4|yes → [3,6]|
|7|8|"z"|1|no|
|8|10|"yy"|2|no|
Result = [[3,6]].

## Complexity Analysis
- **Time:** O(n) – each character is visited at most twice.
- **Space:** O(1) extra space besides the output list.

## Follow-Up Questions
1. How would you modify the algorithm to return the groups themselves, not just indices?
2. Can you solve the problem in a streaming fashion where the string is received character by character?
3. How would you handle Unicode characters or case-insensitive grouping?

## Key Takeaway
A simple two-pointer scan lets you identify and record all maximal runs of identical characters, checking their length on the fly.
