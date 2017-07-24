# MOFTONE

## Demo

- [Demo Page][link-demo]

## About

Material Design Colorをベースに、もふもふな優しい色を生成しました。「マテリアルデザインをそのまま使うとドぎつすぎるなー」と思ったときに参照する使い方を想定しています。

## Use

### デザインツールで使う場合

- ツールに合わせてスウォッチファイルをダウンロードして使用
- NSColorList形式のスウォッチ(※)はMacの様々なソフトウェアで共有利用が可能
- Illustratorはスウォッチ読み込み済みのブランクファイルが利用可能

|     | Illustrator | Photoshop | Sketch | Keynote / Pages / Numbers |
|:---:|:---:|:---:|:---:|:---:|
| Swatches | [Download][link-dl-a1] | [Download][link-dl-a1] | [Download][link-dl-a2] (※) | [Download][link-dl-a2] (※) |
| Template | [Download][link-dl-b1] | --- | --- | --- |

### コーディングで使う場合

- CSS > [Demo Page][link-demo]の色コードを直接コピー
- SCSS > `/src/scss/variable/_moftone.scss`を変数ファイルとしてinclude

## Reference

- [Color - Style - Google design guidelines](https://material.google.com/style/color.html#color-color-palette)

## License

- CC0 1.0 Public Domain
- Author: [Qrac][link-twitter]

[link-demo]:https://qrac.github.io/moftone/
[link-dl-a1]:https://qrac.github.io/moftone/dist/swatches-moftone.ase
[link-dl-a2]:https://qrac.github.io/moftone/dist/swatches-moftone.clr
[link-dl-b1]:https://qrac.github.io/moftone/dist/template-moftone.ai
[link-twitter]:https://twitter.com/Qrac_JP