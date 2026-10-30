# 2468. Split Message Based on Limit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-message-based-on-limit](https://leetcode.com/problems/split-message-based-on-limit)
**Companies:** Amazon, Databricks, Faire, Tiktok, Uber

---

## Problem Description

You are given a string, `message`, and a positive integer, `limit`.

You must **split** `message` into one or more **parts** based on `limit`. Each resulting part should have the suffix `"<a/b>"`, where `"b"` is to be **replaced** with the total number of parts and `"a"` is to be **replaced** with the index of the part, starting from `1` and going up to `b`. Additionally, the length of each resulting part (including its suffix) should be **equal** to `limit`, except for the last part whose length can be **at most** `limit`.

The resulting parts should be formed such that when their suffixes are removed and they are all concatenated **in order**, they should be equal to `message`. Also, the result should contain as few parts as possible.

Return *the parts* `message` *would be split into as an array of strings*. If it is impossible to split `message` as required, return *an empty array*.

**Constraints:**
- `1 <= message.length <= 10^4`
- `message` consists only of lowercase English letters and `' '`.
- `1 <= limit <= 10^4`

## Examples

**Example 1:**
```
Input: message = "this is really a very awesome message", limit = 9
Output: ["thi<1/14>","s i<2/14>","s r<3/14>","eal<4/14>","ly <5/14>","a v<6/14>","ery<7/14>"," aw<8/14>","eso<9/14>","me<10/14>"," m<11/14>","es<12/14>","sa<13/14>","ge<14/14>"]
Explanation:
The first 9 parts take 3 characters each from the beginning of message.
The next 5 parts take 2 characters each to finish splitting message.
In this example, each part, including the last, has length 9.
It can be shown it is not possible to split message into less than 14 parts.
```

**Example 2:**
```
Input: message = "short message", limit = 15
Output: ["short mess<1/2>","age<2/2>"]
Explanation:
Under the given constraints, the string can be split into two parts:
- The first part comprises of the first 10 characters, and has a length 15.
- The next part comprises of the last 3 characters, and has a length 8.
```

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
