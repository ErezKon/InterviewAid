# 318. Maximum Product of Word Lengths

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-word-lengths](https://leetcode.com/problems/maximum-product-of-word-lengths)
**Companies:** Amazon, Google
---

## Problem Description
Given a string array `words`, return *the maximum value of* `length(word[i]) * length(word[j])` *where the two words do not share common letters*. If no such two words exist, return `0`.

**Constraints:**
- `2 <= words.length <= 1000`
- `1 <= words[i].length <= 1000`
- `words[i]` consists only of lowercase English letters.

## Examples

```
Example 1:
  Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
  Output: 16
  Explanation: The two words can be "abcw", "xtfn".
```

```
Example 2:
  Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
  Output: 4
  Explanation: The two words can be "ab", "cd".
```

```
Example 3:
  Input: words = ["a","aa","aaa","aaaa"]
  Output: 0
  Explanation: No such pair of words.
```

## Approach
**Algorithm:** Represent each word as a 26-bit mask. For every pair of masks that have `AND == 0`, compute the product of word lengths and keep the maximum.

```text
FUNCTION maxProduct(words):
    masks ← []
    lengths ← []
    FOR w IN words DO
        SET mask ← 0
        FOR ch IN w DO
            SET bit ← 1 << (ORD(ch) - ORD('a'))
            SET mask ← mask OR bit
        END FOR
        APPEND mask TO masks
        APPEND LEN(w) TO lengths
    END FOR
    SET best ← 0
    FOR i FROM 0 TO LEN(words)-1 DO
        FOR j FROM i+1 TO LEN(words)-1 DO
            IF masks[i] AND masks[j] = 0 THEN
                SET product ← lengths[i] * lengths[j]
                IF product > best THEN SET best ← product
            END IF
        END FOR
    END FOR
    RETURN best
END FUNCTION
```

## Walkthrough
Consider `words = ["abc","def","ghij"]`:
1. Masks: `abc` → 0b111, `def` → 0b111000, `ghij` → bits for g,h,i,j.
2. Pairwise AND checks:
   - `abc` & `def` = 0 → product 3×3=9 (best=9).
   - `abc` & `ghij` = 0 → product 3×4=12 (best=12).
   - `def` & `ghij` = 0 → product 3×4=12 (best remains 12).
3. Return 12.

## Complexity Analysis
| Aspect | Complexity |
|--------|------------|
| Time   | **O(n²)** where *n* is number of words |
| Space  | **O(n)** for masks and lengths |

## Follow-Up Questions
- How would you improve the time complexity using sorting or pruning?
- Can you adapt the solution for Unicode characters beyond 'a'-'z'?
- What if you need the **top-k** products instead of just the maximum?

## Key Takeaway
> **Bitmask each word** – enables O(1) disjoint-letter checks via bitwise AND.
