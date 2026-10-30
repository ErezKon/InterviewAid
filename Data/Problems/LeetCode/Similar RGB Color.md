# 800. Similar RGB Color

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/similar-rgb-color](https://leetcode.com/problems/similar-rgb-color)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

The red-green-blue color `"#AABBCC"` can be written as `"#ABC"` in shorthand.

- For example, `"#15c"` is shorthand for the color `"#1155cc"`.

The similarity between the two colors `"#ABCDEF"` and `"#UVWXYZ"` is `-(AB - UV)^2 - (CD - WX)^2 - (EF - YZ)^2`.

Given a string `color` that follows the format `"#ABCDEF"`, return a string represents the color that is most similar to the given color and has a shorthand (i.e., it can be represented as some `"#XYZ"`).

**Any answer** which has the same highest similarity as the best answer will be accepted.

**Constraints:**
- `color.length == 7`
- `color[0] == '#'`
- `color[i]` is either digit or character in the range `['a', 'f']` for `i > 0`.

**Examples:**

**Example 1:**
```
Input: color = "#09f166"
Output: "#11ee66"
Explanation: The similarity is -(0x09 - 0x11)^2 -(0xf1 - 0xee)^2 - (0x66 - 0x66)^2 = -64 -9 -0 = -73.
This is the highest among any shorthand color.
```

**Example 2:**
```
Input: color = "#4e3fe1"
Output: "#5544dd"
```

---

## Approach: Round Each Component — O(1) ✅

The 17 valid double-digit hex values are `0x00, 0x11, 0x22, ..., 0xff` (multiples of `0x11 = 17`). For each component, find the nearest multiple of 17.

```
FUNCTION similarRGB(color):
    FUNCTION closest(comp):
        val = parseInt(comp, 16)
        idx = ROUND(val / 17)
        RETURN format(idx * 17, "02x")

    r = closest(color[1:3])
    g = closest(color[3:5])
    b = closest(color[5:7])
    RETURN "#" + r + g + b
```

### Walkthrough — `color = "#09f166"`

| Component | Hex | Decimal | val/17 | Rounded | Result |
|-----------|-----|---------|--------|---------|--------|
| R: "09"   | 09  | 9       | 0.53   | 1       | "11"   |
| G: "f1"   | f1  | 241     | 14.18  | 14      | "ee"   |
| B: "66"   | 66  | 102     | 6.0    | 6       | "66"   |

Result: `"#11ee66"`

| Time | Space |
|------|-------|
| O(1) | O(1) |
