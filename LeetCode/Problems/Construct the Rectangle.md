# 492. Construct the Rectangle

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google
---

```
FUNCTION constructRectangle(area):
    w = int(sqrt(area))
    WHILE area % w != 0: w -= 1
    RETURN [area // w, w]
```
