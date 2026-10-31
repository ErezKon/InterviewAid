# 691. Stickers to Spell Word

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stickers-to-spell-word](https://leetcode.com/problems/stickers-to-spell-word)
**Companies:** Google, Ixl, Meta, Tiktok

---

## Problem Description

We are given `n` different types of `stickers`. Each sticker has a lowercase English word on it.

You would like to spell out the given string `target` by cutting individual letters from your collection of stickers and rearranging them. You can use each sticker more than once if you want, and you have infinite quantities of each sticker.

Return *the minimum number of stickers that you need to spell out *`target`. If the task is impossible, return `-1`.

**Note:** In all test cases, all words were chosen randomly from the `1000` most common US English words, and `target` was chosen as a concatenation of two random words.

**Constraints:**
- `n == stickers.length`
- `1 <= n <= 50`
- `1 <= stickers[i].length <= 10`
- `1 <= target.length <= 15`
- `stickers[i]` and `target` consist of lowercase English letters.

## Examples

**Example 1:**
```
Input: stickers = ["with","example","science"], target = "thehat"
Output: 3
Explanation: We can use 2 "with" stickers, and 1 "example" sticker.
After cutting and rearrange the letters of those stickers, we can form the target "thehat".
Also, this is the minimum number of stickers necessary to form the target string.
```

**Example 2:**
```
Input: stickers = ["notice","possible"], target = "basicbasic"
Output: -1
Explanation: We cannot form the target "basicbasic" from cutting letters from the given stickers.
```

## Approach
The problem is solved with DP over subsets of the target characters using a bitmask. Each state represents which characters of the target have been covered. For each state we try applying every sticker, advancing the mask by covering uncovered characters present in the sticker. The DP stores the minimal stickers needed for each mask.

### Pseudocode
```text
FUNCTION minStickers(stickers, target):
    n ← LENGTH(target)
    SET dp[0] ← 0                     // empty mask needs 0 stickers
    FOR mask ← 1 TO (1 << n) - 1:
        SET dp[mask] ← INF
        FOR each sticker IN stickers:
            SET newMask ← mask
            SET cnt ← CHARACTER_COUNT(sticker)   // map char → count
            FOR i ← 0 TO n - 1:
                IF (newMask >> i) & 1 = 1: CONTINUE   // already covered
                ch ← target[i]
                IF cnt[ch] > 0:
                    SET newMask ← newMask | (1 << i)
                    SET cnt[ch] ← cnt[ch] - 1
            IF newMask < mask:                     // sticker contributed
                SET dp[mask] ← MIN(dp[mask], dp[newMask] + 1)
    RETURN dp[(1 << n) - 1] IF dp[(1 << n) - 1] != INF ELSE -1
```

## Walkthrough
Consider `stickers = ["with","example","science"]`, `target = "thehat"` (n=6).
1. Start with mask `111111` (all bits 0) → dp[0]=0.
2. Apply sticker "with": it covers characters `t`, `h`, `w`, `i`. After processing, mask becomes `001011` (positions of `t` and `h` covered).
3. Apply sticker "example": covers `e`, `a`, `l`, `m`, `p`. It adds `e` and `a` to the mask, resulting in `101111`.
4. Apply "with" again to cover remaining `t`. Final mask `111111` achieved with 3 stickers.
The DP finds this minimal count.

## Complexity Analysis
- **Time:** O(2^n * m * L) where `n` is target length, `m` number of stickers, `L` average sticker length (due to character counting). For given constraints this is acceptable.
- **Space:** O(2^n) for the DP table.

## Follow-Up Questions
1. How would you modify the solution if each sticker could be used at most once?
2. Can you improve the runtime by preprocessing stickers to remove dominated ones?
3. How would you adapt the algorithm for Unicode characters?

## Key Takeaway
Modeling the coverage of target characters as a bitmask enables a concise DP that systematically explores sticker combinations to find the minimum count.
