# 423. Reconstruct Original Digits from English

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reconstruct-original-digits-from-english](https://leetcode.com/problems/reconstruct-original-digits-from-english)
**Companies:** Google, Kickdrum, Netapp, Wix

---

## Problem Description
Given a string `s` containing an unordered collection of English letters that together form the English words for digits zero to nine (e.g., "owoztneoer"), reconstruct the original digits in ascending order. Each digit may appear multiple times, and the letters of each digit word may be shuffled. Return a string of digits representing the original numbers.

## Examples
**Example 1:**
```
Input: s = "owoztneoer"
Output: "012"
Explanation: The letters can be rearranged to form "zero", "one", and "two".
```
**Example 2:**
```
Input: s = "fviefuro"
Output: "45"
Explanation: The letters correspond to "four" and "five".
```

## Approach
The solution relies on counting letters and exploiting unique characters that appear in only one digit word. Identify digits with unique letters (e.g., 'z' → zero, 'w' → two, 'u' → four, 'x' → six, 'g' → eight). After fixing those, adjust counts for the remaining digits using letters that become unique after removal.

## Pseudocode
```text
FUNCTION originalDigits(s):
    // Count frequency of each character
    CREATE map count
    FOR ch IN s:
        INCREMENT count[ch]

    CREATE array out[10] ← 0
    // Digits with unique identifiers
    SET out[0] ← count['z']        // zero
    SET out[2] ← count['w']        // two
    SET out[4] ← count['u']        // four
    SET out[6] ← count['x']        // six
    SET out[8] ← count['g']        // eight

    // Resolve remaining digits
    SET out[3] ← count['h'] - out[8]          // three (h appears in eight)
    SET out[5] ← count['f'] - out[4]          // five (f appears in four)
    SET out[7] ← count['s'] - out[6]          // seven (s appears in six)
    SET out[1] ← count['o'] - out[0] - out[2] - out[4]   // one
    SET out[9] ← count['i'] - out[5] - out[6] - out[8]   // nine

    // Build result string in ascending order
    CREATE string result ← ""
    FOR digit FROM 0 TO 9:
        REPEAT out[digit] TIMES:
            APPEND CHAR(digit + '0') TO result
    RETURN result
```

## Walkthrough
Take `s = "fviefuro"`.
1. Count letters: f:2, v:1, i:1, e:2, u:1, r:1, o:1.
2. Unique digits: out[4] = count['u'] = 1 (four), out[5] = count['f'] - out[4] = 2‑1 = 1 (five).
3. All other out[*] become 0.
4. Result string: "45".

## Complexity Analysis
- **Time:** O(n) where n is the length of the input string (counting) plus O(1) for fixed‑size operations.
- **Space:** O(1) extra space for the fixed-size count map and output array.

## Follow‑Up Questions
1. How would the algorithm change if the input could contain uppercase letters?
2. Can you extend the method to handle a different language’s digit words?
3. What is the impact on complexity if the digit words are not guaranteed to be unique in their letters?

## Key Takeaway
Counting letters and leveraging uniquely identifying characters enables a linear‑time reconstruction of the original digits.
