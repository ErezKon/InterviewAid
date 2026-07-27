# 3517. Smallest Palindromic Rearrangement I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-palindromic-rearrangement-i](https://leetcode.com/problems/smallest-palindromic-rearrangement-i)
**Companies:** Amazon, Microsoft

---

## Problem Description

Given a string `num` representing a large integer, rearrange its digits to form the smallest possible palindromic number. The resulting number must not have leading zeros, unless it is the number `0` itself.

## Examples

- **Input:** `num = "41231234"`
  - **Frequencies:** `1:2, 2:2, 3:2, 4:2`. All even.
  - **Half-string:** `1234`.
  - **Output:** `"12344321"`.
- **Input:** `num = "83138"`
  - **Frequencies:** `1:1, 3:2, 8:2`. `1` is the middle character.
  - **Half-string:** `38`.
  - **Output:** `"38183"`.

## Approach: Greedy with Frequency Count [Time: O(N), Space: O(1)]

The core idea is to construct the first half of the palindrome to be as small as possible. A palindrome is defined by its first half and an optional middle character.

1.  **Count Frequencies:** Count the occurrences of each digit ('0'-'9').
2.  **Check Feasibility:** A palindrome can be formed only if at most one digit has an odd frequency. If more than one does, it's impossible (return an empty string or handle as per spec).
3.  **Construct First Half:** Create the first half of the palindrome by taking half of each digit's count (`count[d] / 2`) and appending them in increasing order (from '0' to '9').
4.  **Handle Leading Zeros:** If the first half starts with a '0', swap it with the first non-zero character to form the smallest possible number.
5.  **Find Middle Character:** The digit with an odd count will be the middle character of the palindrome.
6.  **Assemble:** The final result is `first_half + middle_char + reverse(first_half)`.

```
FUNCTION smallestPalindrome(num):
    counts = HASH_MAP('0' -> 0, ..., '9' -> 0)
    FOR digit IN num:
        counts[digit]++

    middle_char = ""
    FOR d FROM '0' TO '9':
        IF counts[d] % 2 != 0:
            IF middle_char != "": RETURN "" // More than one odd count
            middle_char = d

    first_half = ""
    FOR d FROM '0' TO '9':
        first_half += d * (counts[d] / 2)

    // Handle leading zero
    IF first_half.STARTS_WITH('0') AND len(first_half) > 1:
        first_nonzero_idx = -1
        FOR i FROM 1 TO len(first_half) - 1:
            IF first_half[i] != '0':
                first_nonzero_idx = i
                BREAK
        IF first_nonzero_idx != -1:
            // Swap '0' with the smallest non-zero digit
            SWAP(first_half[0], first_half[first_nonzero_idx])

    second_half = REVERSE(first_half)
    RETURN first_half + middle_char + second_half
```

## Complexity

| | Time | Space |
| :-- | :--- | :--- |
| **Overall** | O(N) | O(1) |

- `N` is the length of the input string `num`.
- Counting frequencies takes O(N).
- Constructing the `first_half` string takes O(N) because its length is at most N/2.
- The space complexity is O(1) as the `counts` map is of a fixed size (10).

## Follow-up

- What if the problem asked for the *largest* palindromic rearrangement? (Hint: You would build the first half by adding digits in descending order).
