//
//  CDVUpdateVersion.m
//  心情温度计
//
//  Created by happi on 15/8/18.
//
//

#import "CDVAppCore.h"

@implementation CDVAppCore


- (void)setRootPath:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;

    NSString *url = [command.arguments objectAtIndex:0];
    NSLog(@"CDVAppCore插件获取到的url==>%@",url);

    //拆分路径
    NSArray *urls = [url componentsSeparatedByString:@"/Library"];
    //保存路径
    [self writePath:[urls objectAtIndex:[urls count]-1]];

    [[NSNotificationCenter defaultCenter] postNotificationName:@"loadWebView" object:nil];


    // Create an object with a simple success property.
    NSDictionary *jsonObj = [[NSDictionary alloc] initWithObjectsAndKeys:@"true", @"success",nil];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:jsonObj];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}



//读取
- (NSString *)readPathStatus {
    NSString * fileName=[[self getAPPDirectory] stringByAppendingPathComponent:@"RootPath.plist"];
    NSLog(@"RootPath==>%@",fileName);
    NSDictionary * readDic=[[NSDictionary alloc] initWithContentsOfFile:fileName] ;
    if (readDic) {
        // 获取沙盒主目录路径
        NSString *homeDir = [NSString stringWithFormat:@"%@/Library",NSHomeDirectory()];
        return [[NSString alloc] initWithFormat:@"%@%@",homeDir,[readDic objectForKey:@"path"]];
    } else {
        return nil;
    }
}
//保存
- (void)writePath:(NSString *)path {

    NSString * fileName=[[self getAPPDirectory] stringByAppendingPathComponent:@"RootPath.plist"];
    NSMutableDictionary * readDic=[[NSMutableDictionary alloc] initWithContentsOfFile:fileName];
    if (!readDic) {
        readDic = [[NSMutableDictionary alloc] initWithCapacity:1];
    }
    [readDic setObject:path forKey:@"path"];

    [readDic writeToFile:fileName atomically:NO];

    NSLog(@"保存成功！！！");
}
//删除文件
- (void)clearPath {
    NSString * fileName=[[self getAPPDirectory] stringByAppendingPathComponent:@"RootPath.plist"];
    if ([[NSFileManager defaultManager] fileExistsAtPath:fileName]) {
        [[NSFileManager defaultManager] removeItemAtPath:fileName error:nil];
    }
}


- (NSString *)getAPPDirectory{
    NSArray * paths=NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask,YES);
    return [paths objectAtIndex:0];
}

@end
