# 2193. Minimum Number of Moves to Make Palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome](https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome)
**Companies:** Amazon, Goldman Sachs, Ibm, Microsoft, Rubrik

---

## Problem Description

Given a string `s`, you may perform a move by swapping any two adjacent characters. Determine the minimum number of moves required to transform `s` into a palindrome. If it is impossible, return `-1`.

## Examples

1. **Input:** `s = "aabb"`
   **Output:** `2`
   **Explanation:** Swap the second `a` with the first `b` → `abab`, then swap the second `b` with the last `a` → `abba`.
2. **Input:** `s = "abc"`
   **Output:** `-1`
   **Explanation:** No palindrome can be formed because each character appears an odd number of times.

## Approach

**Algorithm:** Greedy two‑pointer with counting swaps.

1. Verify that at most one character has an odd frequency; otherwise return `-1`.
2. Convert the string to a mutable list.
3. Use two pointers `left` at the start and `right` at the end.
4. While `left < right`:
   - If `s[left] == s[right]`, move both pointers inward.
   - Otherwise, search from `right` towards `left` for a character matching `s[left]`.
   - If a match is found at index `j`:
     * Swap adjacent characters to bring `s[j]` to position `right` (each swap increments the move count).
   - If no match is found (meaning `s[left]` is the unique middle character):
     * Swap `s[left]` one step towards the center (swap with `s[left+1]`) and increment moves; continue without moving `right`.
5. The total number of swaps performed is the answer.

```text
FUNCTION minMovesToPalindrome(s):
    // Frequency check
    freq ← MAP()
    FOR ch IN s DO
        freq[ch] ← freq.GET(ch, 0) + 1
    oddCount ← 0
    FOR v IN freq.VALUES() DO
        IF v MOD 2 = 1 THEN oddCount ← oddCount + 1
    IF oddCount > 1 THEN RETURN -1

    arr ← LIST(s)               // mutable characters
    left ← 0
    right ← LENGTH(arr) - 1
    moves ← 0
    WHILE left < right DO
        IF arr[left] = arr[right] THEN
            left ← left + 1
            right ← right - 1
            CONTINUE
        // Find matching char for arr[left] from the right side
        j ← right
        WHILE j > left AND arr[j] ≠ arr[left] DO
            j ← j - 1
        IF j = left THEN
            // arr[left] is the middle char; swap it towards center
            SWAP(arr[left], arr[left + 1])
            moves ← moves + 1
        ELSE
            // Bring matching char to position right by adjacent swaps
            WHILE j < right DO
                SWAP(arr[j], arr[j + 1])
                moves ← moves + 1
                j ← j + 1
            left ← left + 1
            right ← right - 1
    RETURN moves
```

## Walkthrough

For `s = "aabb"`:

- `left=0` (`a`), `right=3` (`b`). No match at `right`; find `j=2` where `arr[2]=a`.
- Swap positions 2↔3 (`ab`→`ba`), moves = 1, now `arr = [a, a, b, b]`.
- Pointers move inward, next pair matches, total moves = 2.

## Complexity Analysis

- **Time:** `O(n²)` in the worst case due to inner scanning and swapping.
- **Space:** `O(n)` for the mutable character list.

## Follow‑Up Questions

- Can the algorithm be optimized using a Fenwick tree to count inversions for the swap count?
- How would the solution change if swaps could be performed between any two positions (not just adjacent)?
- What is the minimal number of moves for very long strings with only two distinct characters?

## Key Takeaway

A greedy two‑pointer scan that repeatedly brings matching characters together via adjacent swaps yields the minimal move count for palindrome formation.
