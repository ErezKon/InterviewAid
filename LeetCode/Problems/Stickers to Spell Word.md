# 691. Stickers to Spell Word

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stickers-to-spell-word](https://leetcode.com/problems/stickers-to-spell-word)
**Companies:** Google, Ixl, Meta, Tiktok

---

## Approach: BFS/DP with Bitmask or String State — O(2^n · m) ✅

```
FUNCTION minStickers(stickers, target):
    n = len(target)
    // State: bitmask of which target chars are covered
    dp = {0: 0}    // mask → min stickers

    FOR mask ← 0 TO (1 << n) - 1:
        IF mask NOT IN dp: CONTINUE

        FOR sticker IN stickers:
            newMask = mask
            stickerCount = Counter(sticker)
            FOR i ← 0 TO n - 1:
                IF newMask & (1 << i): CONTINUE
                IF target[i] IN stickerCount AND stickerCount[target[i]] > 0:
                    newMask |= (1 << i)
                    stickerCount[target[i]] -= 1

            IF newMask NOT IN dp OR dp[newMask] > dp[mask] + 1:
                dp[newMask] = dp[mask] + 1

    RETURN dp.get((1 << n) - 1, -1)
```
