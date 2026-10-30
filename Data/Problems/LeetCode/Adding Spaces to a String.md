# 2109. Adding Spaces to a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adding-spaces-to-a-string](https://leetcode.com/problems/adding-spaces-to-a-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given a **0-indexed** string `s` and a **0-indexed** integer array `spaces` that describes the indices in the original string where spaces will be added. Each space should be inserted **before** the character at the given index.

- For example, given `s = "EnjoyYourCoffee"` and `spaces = [5, 9]`, we place spaces before `'Y'` and `'C'`, which are at indices `5` and `9` respectively. Thus, we obtain `"Enjoy Your Coffee"`.

Return *the modified string **after** the spaces have been added.*

**Constraints:**
- `1 <= s.length <= 3 * 10^5`
- `s` consists only of lowercase and uppercase English letters.
- `1 <= spaces.length <= 3 * 10^5`
- `0 <= spaces[i] <= s.length - 1`
- All the values of `spaces` are **strictly increasing**.

## Examples
```
Example 1:
  Input: s = "LeetcodeHelpsMeLearn", spaces = [8,13,15]
  Output: "Leetcode Helps Me Learn"
  Explanation:
  The indices 8, 13, and 15 correspond to the characters 'H', 'M' and 'L' in "LeetcodeHelpsMeLearn".
  We then place spaces before those characters.
```
```
Example 2:
  Input: s = "icodeinpython", spaces = [1,5,7,9]
  Output: "i code in py thon"
  Explanation:
  The indices 1, 5, 7, and 9 correspond to the characters 'c', 'i', 'p' and 't' in "icodeinpython".
  We then place spaces before those characters.
```
```
Example 3:
  Input: s = "spacing", spaces = [0,1,2,3,4,5,6]
  Output: " s p a c i n g"
  Explanation:
  We are also able to place spaces before the first character of the string.
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
