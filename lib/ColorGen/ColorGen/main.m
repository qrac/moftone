//
//  main.m
//  ColorGen
//
//  Created by Muukii on 10/19/14.
//  Copyright (c) 2014 Muukii. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>

NSColor *colorWithHexString(NSString *colorCode);

int main(int argc, const char * argv[]) {
    @autoreleasepool {

        NSUserDefaults *args = [NSUserDefaults standardUserDefaults];
        NSLog(@"%@",args.description);
        
        if ([args stringForKey:@"i"]) {
            NSString *colorJsonPath = [NSString stringWithFormat:@"%@",[args stringForKey:@"i"]];
            NSString *fileName = [colorJsonPath.lastPathComponent stringByReplacingOccurrencesOfString:colorJsonPath.pathExtension withString:@""];
            
            NSString *outputPath = [args stringForKey:@"o"];
            if (!outputPath) {
                outputPath = [NSString stringWithFormat:@"%@/%@clr",[colorJsonPath stringByDeletingLastPathComponent],fileName];
            }
            
            NSData *data = [NSData dataWithContentsOfFile:colorJsonPath];
            NSArray *colorData = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
            
            NSLog(@"%@",colorData);
            
            NSString *const kNameKey = @"name";
            NSString *const kColorKey = @"color";
            
            NSColorList *list = [NSColorList.alloc initWithName:fileName];
            for (NSDictionary *dictionary in colorData) {
                NSString *colorName = [dictionary objectForKey:kNameKey];
                NSString *colorString = [dictionary objectForKey:kColorKey];
                NSColor *color = colorWithHexString(colorString);
                
                [list setColor:color forKey:colorName];
            }
            
            [list writeToFile:outputPath];
            NSLog(@"Done!");
        } else {
            NSLog(@"Require input file path [-i]");
            NSLog(@"\n[\n{\n\"name\" : \"MyColo1\",\n\"color\" : \"#ffffff\"\n},\n{\n\"name\" : \"MyColor2\",\n\"color\" : \"#ffff00\"\n}\n]\n");
        }
    }
    return 0;
}

NSColor *colorWithHexString(NSString *colorCode)
{
    if ([[colorCode substringWithRange:NSMakeRange(0, 1)] isEqualToString:@"#"]) {
        colorCode = [colorCode substringWithRange:NSMakeRange(1, colorCode.length - 1)];
    }
    
    if ([colorCode length] == 3) {
        NSMutableString *_colorCode = [[NSMutableString alloc] init];
        
        for (NSInteger i = 0; i < colorCode.length; i++) {
            [_colorCode appendString:[colorCode substringWithRange:NSMakeRange(i, 1)]];
            [_colorCode appendString:[colorCode substringWithRange:NSMakeRange(i, 1)]];
        }
        
        colorCode = [_colorCode copy];
    }
    
    if ([colorCode length] != 6) {
        // invalid colorCode
        return [NSColor blackColor];
    }
    
    NSString *hexCodeStr;
    const char *hexCode;
    char *endptr;
    CGFloat red = 0, green = 0, blue = 0;
    
    for (NSInteger i = 0; i < 3; i++) {
        hexCodeStr = [NSString stringWithFormat:@"+0x%@", [colorCode substringWithRange:NSMakeRange(i * 2, 2)]];
        hexCode    = [hexCodeStr cStringUsingEncoding:NSASCIIStringEncoding];
        
        switch (i) {
            case 0:
                red   = strtol(hexCode, &endptr, 16);
                break;
                
            case 1:
                green = strtol(hexCode, &endptr, 16);
                break;
                
            case 2:
                blue  = strtol(hexCode, &endptr, 16);
                
            default:
                break;
        }
    }
    
    return [NSColor colorWithRed:red / 255.0 green:green / 255.0 blue:blue / 255.0 alpha:1];
}
