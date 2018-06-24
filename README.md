# MOFTONE

## Demo

- [Demo Page][link-demo]

## About

Material Design Color をベースに、もふもふな優しい色を生成しました。「マテリアルデザインをそのまま使うとドぎつすぎるなー」と思ったときに参照する使い方を想定しています。

## Use

### デザインツールで使う場合

- ツールに合わせてスウォッチファイルをダウンロードして使用
- NSColorList 形式のスウォッチ(※)は Mac の様々なソフトウェアで共有利用が可能

|          |      Illustrator       |       Photoshop        |           Sketch           | Keynote / Pages / Numbers  |
| :------: | :--------------------: | :--------------------: | :------------------------: | :------------------------: |
| Swatches | [Download][link-dl-a1] | [Download][link-dl-a1] | [Download][link-dl-a2] (※) | [Download][link-dl-a2] (※) |

### コーディングで使う場合

- CSS > [Demo Page][link-demo]の色コードを直接コピー
- SCSS > `/src/scss/tone/_moftone.scss` を変数ファイルとして include
- Stylus > `/src/stylus/tone/_moftone.styl` を変数ファイルとして include

npm で `_moftone.scss` や `_moftone.styl` をインストールして使えます。

```bash
$ npm i -D moftone
```

## Reference

- [Color - Style - Google design guidelines](https://material.google.com/style/color.html#color-color-palette)

## License

- CC0 1.0 Public Domain
- Author: [Qrac][link-twitter]
- Author Group: [QRANOKO][link-qranoko]

[link-demo]: https://qrac.github.io/moftone/
[link-dl-a1]: https://qrac.github.io/moftone/dist/swatches-moftone.ase
[link-dl-a2]: https://qrac.github.io/moftone/dist/swatches-moftone.clr
[link-dl-b1]: https://qrac.github.io/moftone/dist/template-moftone.ai
[link-twitter]: https://twitter.com/Qrac_JP
[link-qranoko]: https://qranoko.jp
