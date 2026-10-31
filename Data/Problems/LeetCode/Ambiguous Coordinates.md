# 816. Ambiguous Coordinates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ambiguous-coordinates](https://leetcode.com/problems/ambiguous-coordinates)
**Companies:** Google
---

## Problem Description
We had some 2-dimensional coordinates, like `"(1, 3)"` or `"(2, 0.5)"`. Then, we removed all commas, decimal points, and spaces and ended up with the string `s`.

- For example, `"(1, 3)"` becomes `s = "(13)"` and `"(2, 0.5)"` becomes `s = "(205)"`.

Return *a list of strings representing all possibilities for what our original coordinates could have been*.

Our original representation never had extraneous zeroes, so we never started with numbers like `"00"`, `"0.0"`, `"0.00"`, `"1.0"`, `"001"`, `"00.01"`, or any other number that can be represented with fewer digits. Also, a decimal point within a number never occurs without at least one digit occurring before it, so we never started with numbers like `".1"`.

The final answer list can be returned in any order. All coordinates in the final answer have exactly one space between them (occurring after the comma.)

**Constraints:**
- `4 <= s.length <= 12`
- `s[0] == '('` and `s[s.length - 1] == ')'`.
- The rest of `s` are digits.

## Examples
```
Example 1:
  Input: s = "(123)"
  Output: ["(1, 2.3)","(1, 23)","(1.2, 3)","(12, 3)"]
```
```
Example 2:
  Input: s = "(0123)"
  Output: ["(0, 1.23)","(0, 12.3)","(0, 123)","(0.1, 2.3)","(0.1, 23)","(0.12, 3)"]
  Explanation: 0.0, 00, 0001 or 00.01 are not allowed.
```
```
Example 3:
  Input: s = "(00011)"
  Output: ["(0, 0.011)","(0.001, 1)"]
```

## Approach
Generate all possible splits of the inner string into left and right parts. For each part, generate all valid numbers by either keeping it as an integer or inserting a decimal point at every possible position while respecting the no-leading-zero and no-trailing-zero rules. Combine each left number with each right number to form a coordinate.

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

## Follow-Up Questions
1. How would you adapt the solution for longer strings (e.g., length 100)?
2. Can you generate the coordinates in lexicographic order without sorting?
3. What changes are needed if numbers may contain a leading plus sign?

## Key Takeaway
Systematically enumerate split positions and valid decimal placements while enforcing formatting rules to enumerate all possible coordinates.
