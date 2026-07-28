# 2055. Plates Between Candles

**Difficulty:** 🟡 Medium
**Companies:** Adobe, Amazon, Oracle

---

## Problem Description
Given a string `s` consisting of characters `'|'` (candles) and `'*'` (plates), and an array of queries `queries` where each query is a pair `[left, right]` representing indices in `s`, return an array where each element is the number of plates between the closest pair of candles that lie within the query interval. If a query does not contain two candles, the answer is `0`.

## Examples
**Example 1:**
```
Input: s = "**|**|***|", queries = [[2,5],[5,9]]
Output: [2,3]
Explanation:
- For query [2,5], the substring is "|**|"; plates between the two candles are 2.
- For query [5,9], the substring is "|***|"; plates between the candles are 3.
```
**Example 2:**
```
Input: s = "*****", queries = [[0,4]]
Output: [0]
Explanation: No candles in the interval, so result is 0.
```

## Approach
**Algorithm:** Prefix sums + nearest‑candle pre‑computation (Two‑Pass Scan)
**Key Insight:** By pre‑computing for every index the nearest candle to its left and right, each query can be answered in O(1) using a prefix sum of plates between those candles.

```text
FUNCTION platesBetweenCandles(s, queries):
    n ← LENGTH(s)
    leftCandle ← ARRAY of size n filled with -1
    rightCandle ← ARRAY of size n filled with -1
    platePrefix ← ARRAY of size n+1 filled with 0

    // Build leftCandle: nearest candle on or before i
    last ← -1
    FOR i ← 0 TO n-1:
        IF s[i] == '|':
            last ← i
        leftCandle[i] ← last
        platePrefix[i+1] ← platePrefix[i] + (IF s[i] == '*' THEN 1 ELSE 0)

    // Build rightCandle: nearest candle on or after i
    last ← -1
    FOR i ← n-1 DOWNTO 0:
        IF s[i] == '|':
            last ← i
        rightCandle[i] ← last

    answers ← []
    FOR each [l, r] IN queries:
        left ← rightCandle[l]
        right ← leftCandle[r]
        IF left == -1 OR right == -1 OR left >= right:
            APPEND 0 TO answers
        ELSE:
            count ← platePrefix[right] - platePrefix[left+1]
            APPEND count TO answers
    RETURN answers
```

## Walkthrough
Consider `s = "*|*|**|"` (indices 0‑6) and query `[1,6]`.
| i | s[i] | leftCandle[i] | rightCandle[i] | platePrefix[i] |
|---|------|--------------|---------------|----------------|
|0|*| -1 | 1 | 0 |
|1|\|| 1 | 1 | 0 |
|2|*| 1 | 3 | 1 |
|3|\|| 3 | 3 | 1 |
|4|*| 3 | 6 | 2 |
|5|*| 3 | 6 | 3 |
|6|\|| 6 | 6 | 3 |
For the query, `left = rightCandle[1] = 1`, `right = leftCandle[6] = 6`. Plates between are `platePrefix[6] - platePrefix[2] = 3 - 1 = 2`.

## Complexity Analysis
- **Time:** O(n + q) where n = |s| and q = number of queries.
- **Space:** O(n) for the three auxiliary arrays.

## Follow‑Up Questions
1. How would you adapt the solution if the string also contained a third character representing obstacles that block counting plates?
2. Can you answer queries online (as they arrive) without pre‑computing all queries?
3. How would you modify the algorithm to return the positions of the plates instead of just the count?

## Key Takeaway
Pre‑computing nearest candles on both sides and a prefix sum of plates enables each interval query to be answered in constant time.
