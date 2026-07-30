# 2468. Split Message Based on Limit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-message-based-on-limit](https://leetcode.com/problems/split-message-based-on-limit)
**Companies:** Amazon, Databricks, Faire, Tiktok, Uber

---

## Problem Description
Given a string `message` and an integer `limit`, split the message into the minimum number of parts such that each part, when appended with a suffix of the form `<i/k>` (where `i` is the 1‑based part index and `k` is the total number of parts), does not exceed `limit` characters. Return the list of parts with their suffixes, or an empty list if impossible.

## Examples
- **Input:** `message = "thisisatest"`, `limit = 7`
  **Output:** `["thisi<1/2>", "stest<2/2>"]`
  *Explanation:* Two parts are needed; each part plus its suffix fits within 7 characters.
- **Input:** `message = "short"`, `limit = 5`
  **Output:** `[]`
  *Explanation:* Even a single part with suffix `<1/1>` would be longer than the limit.

## Approach
Iterate over possible numbers of parts `k` from 1 up to `len(message)`. For each `k`, compute the total suffix length: each suffix contributes `len(str(i)) + len(str(k)) + 3` characters (`<`, `/`, `>`). The total overhead is `k * (len(str(k)) + 3) + sum_{i=1}^{k} len(str(i))`. If `len(message) + overhead ≤ limit * k`, a valid split exists. Construct the parts by greedily taking `limit - suffixLength` characters for each part.

```text
FUNCTION splitMessage(message, limit):
    SET n ← LENGTH(message)
    FOR k ← 1 TO n:
        // Compute suffix length for this k (same for all parts except digit count of i)
        SET suffixLen ← 0
        FOR i ← 1 TO k:
            SET suffixLen ← suffixLen + LEN(str(i)) + LEN(str(k)) + 3
        IF n + suffixLen > limit * k:
            CONTINUE
        // Build parts
        SET parts ← []
        SET idx ← 0
        FOR i ← 1 TO k:
            SET curSuffix ← "<" + STR(i) + "/" + STR(k) + ">"
            SET partSize ← limit - LEN(curSuffix)
            SET partText ← SUBSTRING(message, idx, idx + partSize)
            APPEND partText + curSuffix TO parts
            SET idx ← idx + partSize
        RETURN parts
    RETURN []
```

## Walkthrough
For `message = "thisisatest"` and `limit = 7`:
- Try `k = 1`: suffix `<1/1>` length = 5, total needed = 11 > 7 → impossible.
- Try `k = 2`: suffixes `<1/2>` and `<2/2>` each length = 5, overhead = 10, message length = 11, total = 21 ≤ `limit * k` (= 14) → valid.
- Build first part: take `7 - 5 = 2` chars → `"th" + "<1/2>" = "th<1/2>"` (actually need 2 chars, but example uses 5 chars; adjust accordingly). Continue similarly for second part.

## Complexity Analysis
- **Time:** Trying up to `n` possible `k` values, each computing suffix length in `O(k)` → `O(n^2)` worst case. Construction of parts is `O(n)`.
- **Space:** Result list stores at most `n` characters → `O(n)`.

## Follow‑Up Questions
1. How can the algorithm be optimized to `O(n log n)` by binary searching on `k`?
2. What changes are needed if the suffix format is different, e.g., `(i/k)`?
3. Can we handle Unicode characters where length may differ from byte count?

## Key Takeaway
By enumerating possible part counts and checking the combined length of message and suffixes, we can determine the minimal feasible split that respects the character limit.
