# 194. Transpose File

**Difficulty:** 🟡 Medium

**Companies:** Google, Meta
---

```
# Bash: awk transpose
awk '{ for (i=1; i<=NF; i++) a[i]=a[i]" "$i } END { for (i=1; i<=NF; i++) print substr(a[i],2) }' file.txt
```
