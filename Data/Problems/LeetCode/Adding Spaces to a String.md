# 2109. Adding Spaces to a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adding-spaces-to-a-string](https://leetcode.com/problems/adding-spaces-to-a-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a string `s` and an integer array `spaces` where each element is a valid index in `s`, insert a single space character before each index specified in `spaces`. Return the resulting string after all insertions. The `spaces` array is sorted in strictly increasing order.

## Examples
**Example 1:**
```
Input: s = "LeetcodeHelpsMeLearn", spaces = [8,13,15]
Output: "Leetcode Helps Me Learn"
Explanation: Insert spaces before indices 8, 13, and 15.
```
**Example 2:**
```
Input: s = "HelloWorld", spaces = [5]
Output: "Hello World"
Explanation: Insert a space before index 5.
```

## Approach
The problem can be solved by iterating through the original string while tracking the next index from `spaces` where a space should be inserted. Use two‑pointer technique: one pointer for the string index and another for the `spaces` array.

```text
FUNCTION addSpaces(s, spaces):
    SET result ← []
    SET spaceIdx ← 0
    FOR i ← 0 TO LEN(s) - 1:
        IF spaceIdx < LEN(spaces) AND i == spaces[spaceIdx]:
            APPEND ' ' TO result
            SET spaceIdx ← spaceIdx + 1
        APPEND s[i] TO result
    RETURN JOIN(result)
```

## Walkthrough
| i | s[i] | spaceIdx | Action | result |
|---|------|----------|--------|--------|
|0|L|0|append L|"L"|
|…|…|…|…|…|
|8|H|0 (spaces[0]=8)|append space then H|"Leetcode H"|
|13|M|1 (spaces[1]=13)|append space then M|"Leetcode Helps M"|
|15|L|2 (spaces[2]=15)|append space then L|"Leetcode Helps Me L"|
|…|…|…|continue|"Leetcode Helps Me Learn"|

## Complexity Analysis
- **Time:** O(n) where n is the length of `s` (each character processed once).
- **Space:** O(n) for the output string.

## Follow‑Up Questions
1. How would you handle duplicate indices in `spaces`?
2. Can you modify the algorithm to insert multiple characters at each index?
3. What if `spaces` is not sorted?

## Key Takeaway
Use a two‑pointer scan to interleave spaces while building the result in linear time.
