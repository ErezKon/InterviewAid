# 3014. Minimum Number of Pushes to Type Word I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i)
**Companies:** Amazon, Elitmus, Google, Snapchat

---

## Problem Description

You are given a string `word` containing **distinct** lowercase English letters.

Telephone keypads have keys mapped with **distinct** collections of lowercase English letters, which can be used to form words by pushing them. For example, the key `2` is mapped with `["a","b","c"]`, we need to push the key one time to type `"a"`, two times to type `"b"`, and three times to type `"c"` *.*

It is allowed to remap the keys numbered `2` to `9` to **distinct** collections of letters. The keys can be remapped to **any** amount of letters, but each letter **must** be mapped to **exactly** one key. You need to find the **minimum** number of times the keys will be pushed to type the string `word`.

Return *the **minimum** number of pushes needed to type *`word` *after remapping the keys*.

An example mapping of letters to keys on a telephone keypad is given below. Note that `1`, `*`, `#`, and `0` do **not** map to any letters.
![img](https://assets.leetcode.com/uploads/2023/12/26/keypaddesc.png)

**Constraints:**
- `1 <= word.length <= 26`
- `word` consists of lowercase English letters.
- All letters in `word` are distinct.

## Examples

**Example 1:**
```
Input: word = "abcde"
Output: 5
Explanation: The remapped keypad given in the image provides the minimum cost.
"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
Total cost is 1 + 1 + 1 + 1 + 1 = 5.
It can be shown that no other mapping can provide a lower cost.
```

**Example 2:**
```
Input: word = "xycdefghij"
Output: 12
Explanation: The remapped keypad given in the image provides the minimum cost.
"x" -> one push on key 2
"y" -> two pushes on key 2
"c" -> one push on key 3
"d" -> two pushes on key 3
"e" -> one push on key 4
"f" -> one push on key 5
"g" -> one push on key 6
"h" -> one push on key 7
"i" -> one push on key 8
"j" -> one push on key 9
Total cost is 1 + 2 + 1 + 2 + 1 + 1 + 1 + 1 + 1 + 1 = 12.
It can be shown that no other mapping can provide a lower cost.
```

## Approach
The position of a character within its key determines the number of presses. Since keys contain eight letters, the index of a character `c` (0‑based) is `ord(c) - ord('a')`. The number of presses for `c` is `(index % 8) + 1`.

```text
FUNCTION minimumPushes(word):
    presses ← 0
    FOR ch IN word:
        idx ← ASCII(ch) - ASCII('a')
        presses ← presses + (idx MOD 8) + 1
    RETURN presses
```

## Walkthrough
For `word = "hello"`:
| Char | idx | idx % 8 | presses |
|------|-----|--------|---------|
| h    | 7   | 7      | 8 |
| e    | 4   | 4      | 5 |
| l    |11   | 3      | 4 |
| l    |11   | 3      | 4 |
| o    |14   | 6      | 7 |
Total = 8+5+4+4+7 = 28.

## Complexity Analysis
- **Time:** O(|word|) – one pass over the string.
- **Space:** O(1).

## Follow-Up Questions
1. How would the solution change if the keypad layout were non‑uniform (different numbers of letters per key)?
2. What if you could reorder the characters to minimize total presses?
3. Extend to a scenario where pressing a key also incurs a fixed overhead cost.

## Key Takeaway
The minimum pushes equal the sum of each character’s position within its eight‑letter key, which can be computed directly from the character’s alphabet index.
