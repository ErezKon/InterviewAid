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
Iterate over the number of parts `k` from 1 upward and take the first feasible `k` (fewest parts). For a fixed `k`, part `i` has suffix `"<i/k>"` of length `3 + len(str(i)) + len(str(k))`, so it can carry `limit - suffixLen(i)` message characters. The split is feasible iff the total capacity covers the message:

`capacity(k) = k * limit - (3k + k * len(str(k)) + digitSum(k)) >= n`, where `digitSum(k) = sum_{i=1}^{k} len(str(i))` is maintained incrementally.

If even the shortest-content suffix `3 + 2 * len(str(k))` is `>= limit`, no part can carry any character for this or any larger `k`, so return `[]`. Note `capacity(k)` is not monotone (it drops when `k` gains a digit), so we scan linearly rather than binary search. Once a feasible `k` is found, build the parts greedily: each part takes `limit - suffixLen(i)` characters; the last part takes whatever remains (never empty, otherwise `k-1` would have been feasible).

```text
FUNCTION splitMessage(message, limit):
    SET n <- LENGTH(message)
    SET digitSum <- 0
    FOR k <- 1 TO n:
        SET lk <- LEN(STR(k))
        SET digitSum <- digitSum + lk
        IF 3 + 2 * lk >= limit:
            RETURN []                      // suffix alone fills a part
        SET capacity <- k * limit - (3 * k + k * lk + digitSum)
        IF capacity < n:
            CONTINUE
        SET parts <- []
        SET idx <- 0
        FOR i <- 1 TO k:
            SET curSuffix <- "<" + STR(i) + "/" + STR(k) + ">"
            SET partSize <- limit - LEN(curSuffix)
            APPEND SUBSTRING(message, idx, idx + partSize) + curSuffix TO parts
            SET idx <- idx + partSize
        RETURN parts
    RETURN []
```

## Walkthrough
**Example 2:** `message = "short message"` (`n = 13`), `limit = 15`.
- `k = 1`: `lk = 1`, `digitSum = 1`, `3 + 2 = 5 < 15`. `capacity = 15 - (3 + 1 + 1) = 10 < 13` -> infeasible.
- `k = 2`: `lk = 1`, `digitSum = 2`. `capacity = 30 - (6 + 2 + 2) = 20 >= 13` -> feasible.
- Build: part 1 suffix `"<1/2>"` (len 5) takes `15 - 5 = 10` chars `"short mess"` -> `"short mess<1/2>"`. Part 2 suffix `"<2/2>"` takes the remaining `"age"` -> `"age<2/2>"`.
- Output: `["short mess<1/2>","age<2/2>"]`.

**Example 1:** `n = 37`, `limit = 9`.
| k | digitSum | capacity |
|---|----------|----------|
| 1..9 | k | `4k` (4, 8, ..., 36) - all `< 37` |
| 10 | 11 | `90 - (30 + 20 + 11) = 29` |
| 11 | 13 | 31 |
| 12 | 15 | 33 |
| 13 | 17 | 35 |
| 14 | 19 | `126 - (42 + 28 + 19) = 37 >= 37` -> feasible |
- Parts 1-9 have 5-char suffixes (`"<i/14>"`) and take 3 chars each (27 chars); parts 10-14 have 6-char suffixes and take 2 chars each (10 chars). Total 37, giving `["thi<1/14>", ..., "ge<14/14>"]`.

## Complexity Analysis
- **Time:** `O(n log n)` - up to `n` values of `k`, each checked in `O(log k)` (digit count); building the parts is `O(n + k log k)` once.
- **Space:** `O(n + k log k)` for the output.

## Follow-Up Questions
1. Why is binary searching on `k` unsafe here (hint: capacity drops when `k` goes from 9 to 10)? How would you restrict it to within a fixed digit-count range?
2. What changes are needed if the suffix format is different, e.g., `(i/k)`?
3. Can we handle Unicode characters where length may differ from byte count?

## Key Takeaway
By enumerating possible part counts and checking the combined length of message and suffixes, we can determine the minimal feasible split that respects the character limit.
