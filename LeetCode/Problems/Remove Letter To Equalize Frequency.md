# 2423. Remove Letter To Equalize Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-letter-to-equalize-frequency](https://leetcode.com/problems/remove-letter-to-equalize-frequency)
**Companies:** Bloomberg, Google, Tcs, Walmart Labs

---

## Problem Description
Given a string `word` consisting of lowercase English letters, you may delete exactly one character from it. Return `true` if it is possible to make the frequencies of all remaining characters equal after this deletion, otherwise return `false`.

## Examples
**Example 1**
```
Input: word = "abcc"
Output: true
Explanation: Remove the last 'c' to get "abc" where each character appears once.
```
**Example 2**
```
Input: word = "aazz"
Output: false
Explanation: No single deletion can equalize the frequencies.
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
