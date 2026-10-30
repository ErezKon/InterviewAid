# 2423. Remove Letter To Equalize Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-letter-to-equalize-frequency](https://leetcode.com/problems/remove-letter-to-equalize-frequency)
**Companies:** Bloomberg, Google, Tcs, Walmart Labs

---

## Problem Description
You are given a **0-indexed** string `word`, consisting of lowercase English letters. You need to select **one** index and **remove** the letter at that index from `word` so that the **frequency** of every letter present in `word` is equal.

Return `true` *if it is possible to remove one letter so that the frequency of all letters in* `word` *are equal, and* `false` *otherwise*.

**Note:**

- The **frequency** of a letter `x` is the number of times it occurs in the string.
- You **must** remove exactly one letter and cannot choose to do nothing.

**Constraints:**

- `2 <= word.length <= 100`
- `word` consists of lowercase English letters only.

## Examples

```
Example 1:
  Input: word = "abcc"
  Output: true
  Explanation: Select index 3 and delete it: word becomes "abc" and each character has a frequency of 1.
```

```
Example 2:
  Input: word = "aazz"
  Output: false
  Explanation: We must delete a character, so either the frequency of "a" is 1 and the frequency of "z" is 2, or vice versa. It is impossible to make all present letters have equal frequency.
```

## Approach
Count the frequency of each character. For each distinct character, simulate removing one occurrence and check whether the multiset of frequencies becomes uniform (all equal). If any simulation succeeds, return true.

```text
FUNCTION equalFrequency(word):
    freqMap ← MAP character → count in word
    FOR each char IN freqMap KEYS:
        // Simulate removal of one occurrence of char
        freqMap[char] ← freqMap[char] - 1
        IF freqMap[char] = 0: REMOVE char FROM freqMap
        IF all values in freqMap are identical:
            RETURN true
        // Restore original count for next iteration
        freqMap[char] ← freqMap.get(char, 0) + 1
    RETURN false
```

## Walkthrough
For `word = "abcc"`:
| Removed char | Frequency map after removal | All equal? |
|--------------|----------------------------|------------|
| 'a' | b:1, c:2 | No |
| 'b' | a:1, c:2 | No |
| first 'c' | a:1, b:1, c:1 | Yes → return true |

## Complexity Analysis
Time: `O(26 * n)` → `O(n)` since the alphabet size is constant.
Space: `O(1)` extra for the frequency map (max 26 entries).

## Follow-Up Questions
1. How would the solution change if you could delete up to `k` characters?
2. What if the string contains uppercase letters as well?
3. Can you determine the minimum number of deletions required to achieve equal frequency?

## Key Takeaway
By enumerating the single‑character removal and checking uniformity of the remaining frequencies, we can decide feasibility in linear time.
