# 2785. Sort Vowels in a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-vowels-in-a-string](https://leetcode.com/problems/sort-vowels-in-a-string)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given a **0-indexed** string `s`, **permute** `s` to get a new string `t` such that:

- All consonants remain in their original places. More formally, if there is an index `i` with `0 <= i < s.length` such that `s[i]` is a consonant, then `t[i] = s[i]`.
- The vowels must be sorted in the **nondecreasing** order of their **ASCII** values. More formally, for pairs of indices `i`, `j` with `0 <= i < j < s.length` such that `s[i]` and `s[j]` are vowels, then `t[i]` must not have a higher ASCII value than `t[j]`.

Return *the resulting string*.

The vowels are `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`, and they can appear in lowercase or uppercase. Consonants comprise all letters that are not vowels.

**Constraints:**
- `1 <= s.length <= 10⁵`
- `s` consists only of letters of the English alphabet in **uppercase and lowercase**.

## Examples
```
Example 1:
  Input: s = "lEetcOde"
  Output: "lEOtcede"
  Explanation: 'E', 'O', and 'e' are the vowels in s; 'l', 't', 'c', and 'd' are all consonants. The vowels are sorted according to their ASCII values, and the consonants remain in the same places.
```

```
Example 2:
  Input: s = "lYmpH"
  Output: "lYmpH"
  Explanation: There are no vowels in s (all characters in s are consonants), so we return "lYmpH".
```

## Approach
1. Scan the string and collect all vowels (either case) in a list.
2. Sort the vowel list by raw ASCII value (uppercase letters `A`-`Z` = 65-90 come before lowercase `a`-`z` = 97-122; no case folding).
3. Iterate the string again, replacing each vowel position with the next element from the sorted list; consonants stay put.

```text
FUNCTION sortVowels(s):
    VOWELS <- "aeiouAEIOU"
    vowelsList <- []
    FOR ch IN s:
        IF ch IN VOWELS:
            APPEND vowelsList WITH ch
    SORT vowelsList BY ASCII VALUE
    result <- []
    idx <- 0
    FOR ch IN s:
        IF ch IN VOWELS:
            APPEND result WITH vowelsList[idx]
            idx <- idx + 1
        ELSE:
            APPEND result WITH ch
    RETURN JOIN(result)
```

## Walkthrough
For `s = "lEetcOde"` (Example 1):
- Collected vowels (in order): `['E','e','O','e']`.
- Sorted by ASCII (`E`=69, `O`=79, `e`=101): `['E','O','e','e']`.

| step | original char | action | result so far |
|------|---------------|--------|--------------|
|1|l|consonant|`l`|
|2|E|vowel -> `vowelsList[0]` = `E`|`lE`|
|3|e|vowel -> `vowelsList[1]` = `O`|`lEO`|
|4|t|consonant|`lEOt`|
|5|c|consonant|`lEOtc`|
|6|O|vowel -> `vowelsList[2]` = `e`|`lEOtce`|
|7|d|consonant|`lEOtced`|
|8|e|vowel -> `vowelsList[3]` = `e`|`lEOtcede`|

Result: `"lEOtcede"`. For `"lYmpH"` (Example 2) the vowel list is empty, so the string is returned unchanged.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting the collected vowels (`n` = length of `s`).
- **Space:** `O(n)` for the vowel list and result string.

## Follow-Up Questions
1. How would you modify the algorithm to sort vowels in descending order?
2. Can you achieve `O(n)` time without explicit sorting by using counting sort on the ten vowel characters (`AEIOUaeiou` in ASCII order)?
3. What changes are needed if the input may contain Unicode vowel characters?

## Key Takeaway
Collecting, sorting, and reinserting vowels while preserving consonant positions yields the desired ordering with straightforward linear passes.
