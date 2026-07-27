# 816. Ambiguous Coordinates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ambiguous-coordinates](https://leetcode.com/problems/ambiguous-coordinates)
**Companies:** Google
---

## Problem Description
Given a string `s` that represents a coordinate without commas, spaces, or decimal points (e.g., "(123)"), return all possible valid coordinates that can be formed by inserting a single comma to split the string into two numbers and optionally inserting a decimal point in each part. Numbers cannot have leading zeros unless the number is exactly "0", and cannot have trailing zeros after a decimal point.

## Examples
**Example 1:**
```
Input: s = "(123)"
Output: ["(1, 23)", "(1, 2.3)", "(12, 3)", "(1.2, 3)"]
```
**Example 2:**
```
Input: s = "(00011)"
Output: ["(0.001, 1)", "(0, 0.011)"]
```

## Approach
Generate all possible splits of the inner string into left and right parts. For each part, generate all valid numbers by either keeping it as an integer or inserting a decimal point at every possible position while respecting the no‑leading‑zero and no‑trailing‑zero rules. Combine each left number with each right number to form a coordinate.

```text
FUNCTION ambiguousCoordinates(s):
    SET inner ← s[1:-1]  // strip parentheses
    SET result ← []
    FUNCTION validNumbers(sub):
        SET nums ← []
        FOR i ← 1 TO LEN(sub):
            SET left ← sub[0:i]
            SET right ← sub[i:]
            IF (left == "0" OR NOT left.startswith("0")) AND NOT right.endswith("0"):
                IF right == "":
                    APPEND left TO nums
                ELSE:
                    APPEND left + "." + right TO nums
        RETURN nums
    FOR i ← 1 TO LEN(inner) - 1:
        FOR x IN validNumbers(inner[0:i]):
            FOR y IN validNumbers(inner[i:]):
                APPEND "(" + x + ", " + y + ")" TO result
    RETURN result
```

## Walkthrough
For `s = "(123)"`:
1. `inner = "123"`.
2. Split at `i=1`: left="1", right="23" → valid left: ["1"], valid right: ["23", "2.3"].
3. Combine → "(1, 23)", "(1, 2.3)".
4. Split at `i=2`: left="12", right="3" → valid left: ["12", "1.2"], valid right: ["3"].
5. Combine → "(12, 3)", "(1.2, 3)".
Result list matches output.

## Complexity Analysis
- **Time:** O(n³) in the worst case due to generating all splits and decimal placements (n ≤ 12 in constraints).
- **Space:** O(n²) for storing intermediate valid numbers.

## Follow‑Up Questions
1. How would you adapt the solution for longer strings (e.g., length 100)?
2. Can you generate the coordinates in lexicographic order without sorting?
3. What changes are needed if numbers may contain a leading plus sign?

## Key Takeaway
Systematically enumerate split positions and valid decimal placements while enforcing formatting rules to enumerate all possible coordinates.
