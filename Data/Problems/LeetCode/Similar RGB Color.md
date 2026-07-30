# 800. Similar RGB Color

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/similar-rgb-color](https://leetcode.com/problems/similar-rgb-color)
**Companies:** Google

---

## Problem Description

In a color represented by a hex string like `"#AABBCC"`, a **similar color** is one where each component (`AA`, `BB`, `CC`) is replaced by a double-digit hex value `"XY"` where `X == Y` (e.g., `"00"`, `"11"`, ..., `"ff"`).

Given a color string `color`, return the closest similar color (minimizing the sum of squared differences of each RGB component).

### Examples

**Example 1:**
- **Input:** `color = "#09f166"`
- **Output:** `"#11ee66"`
- **Explanation:** `#09` → closest double is `#11`, `#f1` → closest is `#ee`, `#66` → stays `#66`.

**Example 2:**
- **Input:** `color = "#4e3fe1"`
- **Output:** `"#5544dd"`

### Constraints

- `color` is a valid 7-character hex color string.

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
