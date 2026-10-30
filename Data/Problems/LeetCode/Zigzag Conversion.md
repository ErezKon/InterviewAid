# 6. Zigzag Conversion

**Difficulty:** 🟡 Medium
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/zigzag-conversion](https://leetcode.com/problems/zigzag-conversion)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Intuit, Meta, Microsoft, Microstrategy, Mitsogo, Oracle, Paypal, Paypay, Salesforce, Servicenow, Tcs, Walmart Labs, Zoho, Zopsmart

---

## 1. Problem Description

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);
```

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of English letters (lower-case and upper-case), `','` and `'.'`.
- `1 <= numRows <= 1000`

---

## 2. Examples

**Example 1:**
```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

**Example 2:**
```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation: P     I    N
A   L S  I G
Y A   H R
P     I
```

**Example 3:**
```
Input: s = "A", numRows = 1
Output: "A"
```

---

## 3. Approach: Row-by-Row Simulation — O(n) ✅

Create `numRows` string builders. Walk through the input, appending each character to the appropriate row, bouncing at top and bottom.

```
FUNCTION convert(s, numRows):
    IF numRows == 1 OR numRows >= len(s):
        RETURN s

    rows = array of numRows empty strings
    curRow = 0
    goingDown = false

    FOR char IN s:
        rows[curRow] += char
        IF curRow == 0 OR curRow == numRows - 1:
            goingDown = !goingDown
        curRow += 1 IF goingDown ELSE -1

    RETURN CONCATENATE all rows
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Follow-Up: Mathematical Index Approach

Characters in row `r` appear at indices with a cycle of `2*(numRows-1)`. Row 0 and last row have one character per cycle; middle rows have two (one at `cycle*k + r`, another at `cycle*(k+1) - r`).

---

## Key Takeaway

> The simulation approach (bounce between rows) is simple and O(n). The math approach directly calculates indices per row without simulation.
