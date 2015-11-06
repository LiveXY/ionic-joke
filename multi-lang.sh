#!/bin/sh

currPath=$(pwd)
sourceFile="$currPath/platforms/ios/心情温度计.xcodeproj/project.pbxproj"

cp -R "$currPath/plugins_code/multi-lang/en.lproj" "$currPath/platforms/ios/"
cp -R "$currPath/plugins_code/multi-lang/zh-Hans.lproj" "$currPath/platforms/ios/"
cp -R "$currPath/plugins_code/multi-lang/zh-Hant.lproj" "$currPath/platforms/ios/"

enCode='		3CADE2381B95522F000132BF /\* en \*/ = \{isa = PBXFileReference; lastKnownFileType = text\.plist\.strings; name = en; path = en\.lproj/Localizable\.strings; sourceTree = "<group>"; \};\n'
zhCode='		3CADE23A1B95523B000132BF /\* zh-Hans \*/ = \{isa = PBXFileReference; lastKnownFileType = text\.plist\.strings; name = "zh-Hans"; path = "zh-Hans\.lproj/Localizable\.strings"; sourceTree = "<group>"; \};\n'
twCode='		64AD6F961B958FEF00E5560C /\* zh-Hant \*/ = \{isa = PBXFileReference; lastKnownFileType = text\.plist\.strings; name = "zh-Hant"; path = "zh-Hant\.lproj/Localizable\.strings"; sourceTree = "<group>"; \};\n'

langs='knownRegions = \(
				English,
				Japanese,
				French,
				German,
				en,
				es,
				de,
				se,
			\);'
langsZH='knownRegions = \(
				English,
				Japanese,
				French,
				German,
				en,
				es,
				de,
				se,
				"zh-Hans",
				"zh-Hant",
			\);'
groupCode='/\* Begin PBXVariantGroup section \*/
		3CADE2391B95522F000132BF /\* Localizable\.strings \*/ = \{
			isa = PBXVariantGroup;
			children = \(
				3CADE2381B95522F000132BF /\* en \*/,
				3CADE23A1B95523B000132BF /\* zh-Hans \*/,
				64AD6F961B958FEF00E5560C /\* zh-Hant \*/,
			\);
			name = Localizable\.strings;
			sourceTree = "<group>";
		\};
/\* End PBXVariantGroup section \*/\n\n'
find "$sourceFile" | xargs perl -pi -e "s|$enCode||g"
find "$sourceFile" | xargs perl -pi -e "s|$zhCode||g"
find "$sourceFile" | xargs perl -pi -e "s|$twCode||g"
find "$sourceFile" | xargs perl -pi -0e "s|$langsZH|$langs|igs"
find "$sourceFile" | xargs perl -pi -0e "s|$groupCode||igs"

findPos='/\* End PBXFileReference section \*/\n'
find "$sourceFile" | xargs perl -pi -e "s|$findPos|$enCode$findPos|g"
find "$sourceFile" | xargs perl -pi -e "s|$findPos|$zhCode$findPos|g"
find "$sourceFile" | xargs perl -pi -e "s|$findPos|$twCode$findPos|g"
find "$sourceFile" | xargs perl -pi -0e "s|$langs|$langsZH|igs"
find "$sourceFile" | xargs perl -pi -e "s|$findPos|$findPos\n$groupCode|g"
